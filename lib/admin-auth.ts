import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";
import { createServerSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";
import { getSiteSettings } from "@/lib/site-content";

const COOKIE_NAME = "admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12;

type AdminSessionPayload = {
  email: string;
  exp: number;
};

function getSessionSecret() {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "devmind-admin-session"
  );
}

function sign(value: string) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("hex");
}

function encodePayload(payload: AdminSessionPayload) {
  const raw = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${raw}.${sign(raw)}`;
}

function decodePayload(value: string | undefined): AdminSessionPayload | null {
  if (!value) {
    return null;
  }

  const [raw, signature] = value.split(".");
  if (!raw || !signature) {
    return null;
  }

  const expected = sign(raw);
  const safe =
    signature.length === expected.length &&
    timingSafeEqual(Buffer.from(signature), Buffer.from(expected));

  if (!safe) {
    return null;
  }

  try {
    const parsed = JSON.parse(Buffer.from(raw, "base64url").toString("utf8")) as AdminSessionPayload;
    if (!parsed.email || !parsed.exp || parsed.exp < Date.now()) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export async function getWhitelistedAdminEmails() {
  const settings = await getSiteSettings();
  const envEmails =
    process.env.ADMIN_EMAILS?.split(",").map((item) => item.trim()).filter(Boolean) ?? [];

  // Also include the singular ADMIN_EMAIL from env
  if (process.env.ADMIN_EMAIL) {
    envEmails.push(process.env.ADMIN_EMAIL);
  }

  return Array.from(new Set([...settings.adminEmails, ...envEmails])).filter(Boolean);
}

export async function createAdminSession(email: string) {
  const cookieStore = await cookies();
  const payload: AdminSessionPayload = {
    email,
    exp: Date.now() + SESSION_TTL_SECONDS * 1000,
  };

  cookieStore.set(COOKIE_NAME, encodePayload(payload), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  return decodePayload(cookieStore.get(COOKIE_NAME)?.value);
}

export async function authenticateAdmin(email: string, password: string) {
  const allowedEmails = await getWhitelistedAdminEmails();

  if (!allowedEmails.includes(email)) {
    return { ok: false, error: "This email is not allowed to access the admin panel." };
  }

  if (isSupabaseConfigured()) {
    const supabase = createServerSupabaseClient();
    if (supabase) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (!error) {
        return { ok: true as const };
      }
    }
  }

  const fallbackEmail = process.env.ADMIN_EMAIL || "admin@devmindstudio.com";
  const fallbackPassword = process.env.ADMIN_PASSWORD || "devmind2026";

  if (email === fallbackEmail && password === fallbackPassword) {
    return { ok: true as const };
  }

  return { ok: false, error: "Invalid email or password." };
}

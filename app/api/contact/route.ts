import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";
import { getSiteSettings } from "@/lib/site-content";

type InquiryPayload = {
  name?: string;
  email?: string;
  phone?: string;
  projectType?: string;
  budget?: string;
  message?: string;
};

async function saveInquiry(payload: InquiryPayload) {
  const supabase = createServerSupabaseClient();
  if (!supabase) {
    return;
  }

  const insertPayload = {
    name: payload.name,
    email: payload.email,
    phone: payload.phone || null,
    project_type: payload.projectType || null,
    budget: payload.budget || null,
    message: payload.message,
    read: false,
    created_at: new Date().toISOString(),
  };

  await supabase.from("inquiries").insert(insertPayload);
}

async function sendInquiryNotification(payload: InquiryPayload) {
  if (!process.env.RESEND_API_KEY) {
    return;
  }

  const settings = await getSiteSettings();

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "DevMind Studio <onboarding@resend.dev>",
      to: [settings.email],
      subject: `New inquiry from ${payload.name}`,
      html: `
        <h2>New DevMind Studio inquiry</h2>
        <p><strong>Name:</strong> ${payload.name}</p>
        <p><strong>Email:</strong> ${payload.email}</p>
        <p><strong>Phone:</strong> ${payload.phone || "Not provided"}</p>
        <p><strong>Project Type:</strong> ${payload.projectType || "Not provided"}</p>
        <p><strong>Budget:</strong> ${payload.budget || "Not provided"}</p>
        <p><strong>Message:</strong></p>
        <p>${payload.message}</p>
      `,
    }),
  });
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as InquiryPayload;

    if (!payload.name || !payload.email || !payload.message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    await Promise.allSettled([saveInquiry(payload), sendInquiryNotification(payload)]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact submission error", error);
    return NextResponse.json(
      { error: "Failed to submit inquiry." },
      { status: 500 }
    );
  }
}

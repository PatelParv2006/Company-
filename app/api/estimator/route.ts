import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";

type EstimatorPayload = {
  name?: string;
  email?: string;
  projectType?: string;
  features?: string[];
  designQuality?: string;
  timeline?: string;
  support?: string;
  estimatedMin?: number;
  estimatedMax?: number;
  currency?: string;
};

async function saveEstimate(payload: EstimatorPayload) {
  const supabase = createServerSupabaseClient();
  if (!supabase) {
    return;
  }

  const insertPayload = {
    name: payload.name || null,
    email: payload.email || null,
    project_type: payload.projectType || null,
    features: payload.features || [],
    design_quality: payload.designQuality || null,
    timeline: payload.timeline || null,
    support: payload.support || null,
    estimated_min: payload.estimatedMin || 0,
    estimated_max: payload.estimatedMax || 0,
    currency: payload.currency || "INR",
    created_at: new Date().toISOString(),
  };

  const primary = await supabase.from("estimator_submissions").insert(insertPayload);

  if (primary.error) {
    await supabase.from("estimator_subs").insert(insertPayload);
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as EstimatorPayload;

    if (!payload.projectType || !payload.estimatedMin || !payload.estimatedMax) {
      return NextResponse.json(
        { error: "Project details and estimate range are required." },
        { status: 400 }
      );
    }

    await saveEstimate(payload);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Estimator submission error", error);
    return NextResponse.json(
      { error: "Failed to submit estimate." },
      { status: 500 }
    );
  }
}

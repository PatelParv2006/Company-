import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, phone, projectType, budget, message } = data;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
    }

    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== "your_supabase_url") {
      const { error } = await supabase
        .from('inquiries')
        .insert([
          { name, email, phone: phone || null, project_type: projectType || null, budget: budget || null, message }
        ]);

      if (error) {
        console.error("Supabase insert error:", error);
      }
    } else {
      console.log("Supabase not configured. Inquiry received:", data);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Failed to submit inquiry" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    const { name, email, phone, config, estimated_price, currency } = data;
    
    if (!config) {
      return NextResponse.json({ error: "Configuration data is required" }, { status: 400 });
    }

    // Try to save to Supabase if configured
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== "your_supabase_url") {
      const { error } = await supabase
        .from('estimator_submissions')
        .insert([
          { 
            name: name || null, 
            email: email || null, 
            phone: phone || null, 
            config, 
            estimated_price, 
            currency 
          }
        ]);

      if (error) {
        console.error("Supabase insert error:", error);
        // We still return success to the user so they aren't blocked by DB errors
      }
    } else {
      console.log("Supabase not configured. Submission received:", data);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Estimator API error:", error);
    return NextResponse.json({ error: "Failed to submit estimate" }, { status: 500 });
  }
}

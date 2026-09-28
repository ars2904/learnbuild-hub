import { NextResponse } from "next/server";
import { memorySiteSettings } from "@/lib/data/cmsStore";
import { createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = createServerClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from("site_settings").select("*").single();
      if (!error && data) {
        return NextResponse.json({ success: true, data });
      }
    } catch (e) {
      console.warn("Supabase fetch site settings error fallback:", e);
    }
  }

  return NextResponse.json({ success: true, data: memorySiteSettings });
}

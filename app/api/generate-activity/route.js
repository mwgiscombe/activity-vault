import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { ActivitySchema } from "@/lib/activitySchema";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const maxDuration = 60; // generation can take a while (matters on Vercel)

export async function POST(request) {
  // 1. Only logged-in users can spend your API credit
  const supabase = await createClient();
  const { data, error: authError } = await supabase.auth.getUser();
  if (authError || !data?.user) {
    return NextResponse.json({ error: "Please log in." }, { status: 401 });
  }

  // 2. Validate input
  const { theme, ageGroup, groupSize, duration, materialsOnHand } =
    await request.json();

  if (!theme?.trim() || !ageGroup?.trim()) {
    return NextResponse.json(
      { error: "Theme and age group are required." },
      { status: 400 }
    );
  }
  if (theme.length > 200 || (materialsOnHand ?? "").length > 500) {
    return NextResponse.json({ error: "Input is too long." }, { status: 400 });
  }

  // 3. Call OpenAI
  try {
    const response = await client.responses.parse({
      model: process.env.OPENAI_MODEL,
      instructions:
        "You are an experienced afterschool program coordinator. Create " +
        "complete, ready-to-run activity plans for program staff. Use " +
        "age-appropriate language, inexpensive materials, and include " +
        "clear safety notes. Printables should contain the full text " +
        "that goes on the page, not just a description.",
      input:
        `Theme: ${theme}\n` +
        `Age group: ${ageGroup}\n` +
        `Group size: ${groupSize || "not specified"}\n` +
        `Duration: ${duration || 45} minutes\n` +
        `Materials already on hand: ${materialsOnHand || "none specified"}`,
      text: { format: zodTextFormat(ActivitySchema, "activity") },
    });

    return NextResponse.json({ activity: response.output_parsed });
  } catch (err) {
    console.error("OpenAI error:", err);
    return NextResponse.json(
      { error: "Couldn't generate the activity. Please try again." },
      { status: 500 }
    );
  }
}
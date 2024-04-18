import { NextResponse } from "next/server";
import { conectDB } from "@/libs/mongoose";
import MicroCredit from "@/models/MicroCredit";

export async function GET() {
  try {
    await conectDB();
    const microCredits = await MicroCredit.find();
    console.log(microCredits);
    return NextResponse.json(microCredits);
  } catch (error) {
    NextResponse.json({ error: error.message }, 500);
  }
}

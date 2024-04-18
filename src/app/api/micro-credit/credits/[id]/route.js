import { NextResponse } from "next/server";
import { conectDB } from "@/libs/mongoose";
import MicroCredit from "@/models/MicroCredit";

export async function GET(request, { params }) {
  try {
    await conectDB();
    const microCredits = await MicroCredit.find({
      client: params.id,
    });
    return NextResponse.json(microCredits);
  } catch (error) {
    NextResponse.json({ error: error.message });
  }
}

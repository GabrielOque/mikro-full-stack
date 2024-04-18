import { NextResponse } from "next/server";
import Commerce from "@/models/Commerce";
import { conectDB } from "@/libs/mongoose";

export async function GET() {
  try {
    await conectDB();

    const commerces = await Commerce.find();
    return NextResponse.json(commerces);
  } catch (error) {
    NextResponse.json({ error: error.message }, 500);
  }
}

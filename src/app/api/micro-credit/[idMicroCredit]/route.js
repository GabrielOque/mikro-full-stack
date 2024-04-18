import { NextResponse } from "next/server";
import { conectDB } from "@/libs/mongoose";
import MicroCredit from "@/models/MicroCredit";

export async function GET(request, { params }) {
  try {
    await conectDB();
    const microCredits = await MicroCredit.find({
      commerce: params.idMicroCredit,
    });
    return NextResponse.json(microCredits);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

export async function PUT(request, { params }) {
  try {
    await conectDB();
    const body = await request.json();
    const microCreditUpdated = await MicroCredit.findByIdAndUpdate(
      params.idMicroCredit,
      body,
      { new: true }
    );
    return NextResponse.json(microCreditUpdated);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

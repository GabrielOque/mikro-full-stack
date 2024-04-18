import { NextResponse } from "next/server";
import Commerce from "@/models/Commerce";
import { conectDB } from "@/libs/mongoose";

export async function GET(request, { params }) {
  try {
    await conectDB();
    const { IdCommerce } = params;
    const commerce = await Commerce.findById(IdCommerce);
    return NextResponse.json(commerce);
  } catch (error) {
    NextResponse.json({ error: error.message }, 500);
  }
}

import { NextResponse } from "next/server";
import Commerce from "@/models/Commerce";
import { conectDB } from "@/libs/mongoose";

export async function POST(request, { params }) {
  try {
    await conectDB();
    const body = await request.json();
    const newCommerce = new Commerce(body);
    const commerceSaved = await newCommerce.save();
    return NextResponse.json(commerceSaved);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

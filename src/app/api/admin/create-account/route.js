import { NextResponse } from "next/server";
import UserAdmin from "@/models/UserAdmin";
import { conectDB } from "@/libs/mongoose";

export async function POST(request, { params }) {
  try {
    await conectDB();
    const body = await request.json();
    const newUser = new UserAdmin(body);
    const userCreated = await newUser.save();
    return NextResponse.json(userCreated);
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

import { NextResponse } from "next/server";
import UserClient from "@/models/UserClient";
import { conectDB } from "@/libs/mongoose";

export async function POST(request, { params }) {
  try {
    await conectDB();
    const body = await request.json();
    const newUser = new UserClient(body);
    const userCreated = await newUser.save();
    return NextResponse.json(userCreated);
  } catch (error) {
    return NextResponse.error(error);
  }
}

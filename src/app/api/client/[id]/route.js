import { NextResponse } from "next/server";
import { conectDB } from "@/libs/mongoose";
import UserClient from "@/models/UserClient";

export async function GET(request, { params }) {
  try {
    conectDB();
    const user = await UserClient.findById(params.id);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

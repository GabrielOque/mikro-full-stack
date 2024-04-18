import { NextResponse } from "next/server";
import UserClient from "@/models/UserClient";
import UserAdmin from "@/models/UserAdmin";
import { conectDB } from "@/libs/mongoose";

export async function POST(request, { params }) {
  try {
    await conectDB();
    const { email, password } = await request.json();
    console.log(email, password);
    const userFount = await UserClient.findOne({ email });
    if (userFount) {
      if (userFount.password !== password)
        return NextResponse.json({ message: "Password incorrect" });
      return NextResponse.json(userFount);
    }
    const adminFound = await UserAdmin.findOne({ email });
    if (adminFound) {
      if (adminFound.password !== password)
        return NextResponse.json({ message: "Password incorrect" });
      return NextResponse.json(adminFound);
    }
    return NextResponse.json({ message: "User not found" });
  } catch (error) {
    return NextResponse.error(error);
  }
}

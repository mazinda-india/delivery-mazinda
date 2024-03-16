import DeliveryBoy from "@/models/DeliveryBoy";
import connectDB from "@/lib/mongoose";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
export const GET = async (req) => {
  const token = cookies().get("access_token");
  let decoded;
  try {
    decoded = jwt.verify(token.value, process.env.JWT_SECRET);
    return NextResponse.json({ success: true, decoded: decoded });
  } catch (err) {
    return NextResponse.json({ err, success: false });
  }
};

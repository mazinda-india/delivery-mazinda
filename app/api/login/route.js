import DeliveryBoy from "@/models/DeliveryBoy";
import connectDB from "@/lib/mongoose";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export const POST = async (req) => {
  await connectDB();
  const { phone, password } = await req.json();
  const userdata = await DeliveryBoy.findOne({
    phone,
  });
  if (!userdata) {
    return NextResponse.json({ message: "No user Exist" }, { status: 400 });
  }
  const verify = bcryptjs.compareSync(password, userdata.password);
  if (!verify) {
    return NextResponse.json({ message: "password dont match" });
  }

  const tokenData = {
    id: userdata._id,
    email: userdata.email,
    name: userdata.name,
  };
  const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  cookies().set("access_token", token, { httpOnly: true });
  return NextResponse.json({ message: "login successful" });
};

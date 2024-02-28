import DeliveryBoy from "@/models/DeliveryBoy";
import connectDB from "@/lib/mongoose";
import bcryptjs from "bcryptjs";

import { NextResponse } from "next/server";

export const POST = async (req) => {
  await connectDB();
  const { name, email, password, phone } = await req.json();
  const userdata = await DeliveryBoy.findOne({ email });
  if (userdata) {
    return NextResponse.json({ message: "User Aready Exists" });
  }

  const salt = bcryptjs.genSaltSync(10);
  const hashedPassword = bcryptjs.hashSync(password, salt);

  const newBoy = DeliveryBoy({
    name,
    email,
    password: hashedPassword,
    phone,
  });
  await newBoy.save();

  return NextResponse.json({ message: "SignedUp" }, { status: 200 });
};

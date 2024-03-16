import DeliveryBoy from "@/models/DeliveryBoy";
import connectDB from "@/lib/mongoose";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const GET = async () => {
  const token = cookies().get("access_token").value;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const deliveryboy = await DeliveryBoy.findById({ _id: decoded.id });

  return NextResponse.json({
    success: true,
    isAvailable: deliveryboy.isAvailable,
  });
};
export const PUT = async (req) => {
  await connectDB();
  const { isAvailable, id } = await req.json();
  try {
    const updatedDeliveryBoy = await DeliveryBoy.findByIdAndUpdate(
      id,
      { isAvailable },
      { new: true, runValidators: true }
    );

    if (!updatedDeliveryBoy) {
      return NextResponse.json({
        message: "Delivery boy not found",
        success: false,
      });
    }

    return NextResponse.json({
      message: "Delivery boy updated",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Delivery boy cannot be updated " + error,
      success: false,
    });
  }
};

import DeliveryBoy from "@/models/DeliveryBoy";
import connectDB from "@/lib/mongoose";

import { NextResponse } from "next/server";

export const GET = async (req) => {};
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

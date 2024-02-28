import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";
import FoodOrder from "@/models/FoodOrder";

export async function POST(req) {
  const { orderId } = await req.json();
  try {
    await connectDB();

    let foodOrder = await FoodOrder.findById(orderId);

    if (!foodOrder.vendorVerified) {
      //   foodOrder.updateOne({ _id: orderId }, { $set: { vendorVerified: true } });
      foodOrder.vendorVerified = true;
      foodOrder.updatedAt = new Date();
      await foodOrder.save();
    } else if (!foodOrder.userVerified) {
      foodOrder.userVerified = true;
      foodOrder.updatedAt = new Date();
      foodOrder.isDelivered = true;
      await foodOrder.save();
    }

    return NextResponse.json({
      success: true,
      message: "Food Orders updated successfully",
      foodOrder,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "An error occurred while updating the food orders : " + error,
    });
  }
}

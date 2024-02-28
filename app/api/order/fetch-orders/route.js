import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";
import FoodOrder from "@/models/FoodOrder";

export async function POST() {
  try {
    await connectDB();

    let foodOrders = await FoodOrder.find({ userVerified: false });

    return NextResponse.json({
      success: true,
      message: "Food orders fetched successfully",
      foodOrders,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "An error occurred while fetching the food orders : " + error,
    });
  }
}

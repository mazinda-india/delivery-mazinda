import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";
import FoodOrder from "@/models/FoodOrder";

export async function POST() {
  try {
    console.log("here");
    await connectDB();

    let foodOrders = await FoodOrder.find();
    console.log(foodOrders);

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

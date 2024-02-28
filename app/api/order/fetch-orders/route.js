import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";
import FoodOrder from "@/models/FoodOrder";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
export async function GET() {
  try {
    await connectDB();
    const token = cookies().get("access_token");

    const decoded = jwt.verify(token.value, process.env.JWT_SECRET);

    let foodOrders = await FoodOrder.find({ deliveryBoyId: decoded.id });

    return NextResponse.json({
      success: true,
      name: decoded.name,
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

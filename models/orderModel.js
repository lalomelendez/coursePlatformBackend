// models/orderModel.js

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    coursesPurchased: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    ],
    purchaseDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["completed", "pending", "refunded"],
      default: "pending",
    },
    paymentMethod: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;

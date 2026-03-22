const mongoose = require("mongoose");
const transactionSchema = mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    type: {
      type: String,
      enum: ["income", "expense", "misc"],
      required: true,
    },
    category: {
      type: String,
      enum: ["food", "essential", "car", "vacation"],
      required: true,
    },
    date: {
      type: Date,
      //   required: true,
      index: true,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const transactionModel = mongoose.model("Transaction", transactionSchema);
module.exports = transactionModel;

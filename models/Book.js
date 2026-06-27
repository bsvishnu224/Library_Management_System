const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    isbn: String,
    category: String,
    quantity: Number,
    availableQuantity: Number
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Book", bookSchema);
const mongoose = require("mongoose");

const shoppingListSchema = new mongoose.Schema(
  {
    cx_name: { type: String, required: true },
    cx_phone_number: { type: String, required: true },
    list_image_url: { type: String, required: true },
    submited_at: { type: Date, required: true },
    is_done: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const ShoppingListModel = mongoose.model(
  "submitlist",
  shoppingListSchema,
  "submitlist"
);
module.exports = ShoppingListModel;

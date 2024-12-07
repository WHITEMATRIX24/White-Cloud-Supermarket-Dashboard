const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  item_code: String,
    item_name: String,
    mesuring_qntty: String,
    item_mrp: Number,
    offer_price: Number,
    discount: Number,
    item_catogory: [{ type: String }],
    item_tags: [{ type: String }],
    //item_tags: String,
    item_type: String,
    item_hsb: String,
    instock_outstock_indication: String,
    stock_quantity: Number,
    item_discription: String,
    item_image: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
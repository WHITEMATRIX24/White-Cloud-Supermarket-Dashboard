const mongoose = require('mongoose');


const ItemSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  item_code: String,
  item_name: String,
  mesuring_qntty: String,
  item_mrp: Number,
  offer_price: Number,
  discount: Number,
  item_catogory: [{ type: String }],
  item_tags: [{ type: String }],
  instock_outstock_indication: String,
  stock_quantity: Number,
  item_discription: String,
  created_at: Date,
  updated_at: Date,
});


const invoiceSchema = new mongoose.Schema({
  cx_id: String,
  cx_address: String,
  order_status : String,
  cx_phone_number: Number,
  cx_name: String,
  oba: Number,
  payment_mode: String,
  order_id: String,
  order_date: Date,
  order_status: String,
  item_details: [ItemSchema,]
});







const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;

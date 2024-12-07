
const mongoose = require('mongoose');

const address_Schema = new mongoose.Schema({
    id: String,
    name: String,
    mobile: String,
    addressLine1: String,
    addressLine2: String,
    state: String,
    city: String,
    pincode: String,
    isDefault: Boolean
})


const ItemSchema = new mongoose.Schema({
    itemId: String,
    itemName: String,
    itemImage: String,
    count: Number,
    price: Number
  });

const order_Schema = new mongoose.Schema({
    id: String,
    orderDate: Date,
    status: String,
    orderValue: Number,
    items: [ItemSchema,]
})




const userSchema = new mongoose.Schema({
    name: String,
    created_at: Date,
    phone: String,
    user_address : [address_Schema,],
    user_order : [order_Schema,]
    
});

const User = mongoose.model('User', userSchema);

module.exports = User;

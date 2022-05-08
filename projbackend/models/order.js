const mongoose = require("mongoose");

const {ObejctId} = mongoose.Schema;
const ProductCartSchema = new mongoose.Schema({
    product: {
        type: ObejctId,
        ref: "Product"
    },
    name: String,
    count: Number,
    price: Number
});

const ProductCart = mongoose.model("ProductCart", ProductCartSchema);

const OrderSchema = new mongoose.Schema({
    products: [ProductCartSchema],
    transaction_id: {},
    amount: {type:Number},
    address: String,
    updated: Date,
    user: {
        type: ObejctId,
        ref: "User"
    }
}, {timestamps: true} );

const Order = mongoose.model("Order", OrderSchema);

module.exports = mongoose.Schema("ProductCart", ProductCartSchema);
module.exports = mongoose.Schema("Order", OrderSchema);
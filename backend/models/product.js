import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
const productSchema = mongoose.Schema({
    name: {
        type: String,
        strim: true,
        maxLength: 32,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 2000
    },
    price: {
        required: true,
        type: Number
    },
    category: {
        type: ObjectId,
        ref: 'Category',
        required: true
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    sold: {
        type: Number,
        default: 0
    },
    quantity: {
        type: Number
    },
    shipping: {
        type: Boolean,
        required: false
    }
}, { timeStamps: true });

module.exports = mongoose.model("Product", productSchema)
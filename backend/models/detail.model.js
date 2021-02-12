const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const detailSchema = new Schema({
    accountname: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    date: { type: Date, required: true },
    images: { type: Array, default: [] },
    views: { type: Number, default: 0 },
    campaign: { type: String, required: false },
    menpai: { type: String, required: false },
    role: { type: String, required: false }
}, {
    timestamps: true,
});

const Detail = mongoose.model("Detail", detailSchema);

module.exports = Detail; 
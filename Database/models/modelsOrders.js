import mongoose from 'mongoose';

const collectionOrders = 'listOrders';

const schemaOrders = new mongoose.Schema({
	author: {
		username: { type: String, require: true },
		phoneNumber: { type: Number, require: true },
        address: { type: String, require: true },
    },
    numOrder: { type: Number, require: true, default: 1 },
    state: { type: String, require: true, default: 'generada' },
    items:[],
	date: String,
});

const modelOrders = mongoose.model(collectionOrders, schemaOrders);

export default modelOrders;
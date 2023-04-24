import mongoose from 'mongoose';

const collectionOrders = 'listOrders';

const schemaOrders = new mongoose.Schema({
	buyer: {
		username: { type: String, require: true },
		phoneNumber: { type: Number, require: true },
        address: { type: String, require: true },
    },
    state: { type: String, require: true, default: 'generada' },
    items:[],
	timestamp: String,
});

const modelOrders = mongoose.model(collectionOrders, schemaOrders);

export default modelOrders;
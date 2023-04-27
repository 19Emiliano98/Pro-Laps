import logger from '../../services/logger.js';
import modelOrders from '../models/modelsOrders.js';
import connectMongo from '../config/dataMongo.js';

connectMongo();

export default class daoOrders {
	
	async init() {
        console.log('cart dao en mongodb -> listo!')
    }
	
	async disconnect() {
        console.log('cart dao en mongodb -> cerrado!')
    }
    
    async getOrder(mail) {
		try {
			const orders = await modelOrders.find({ 'author.username': mail });
			return orders;
		} catch (err) {
			logger.error('Error al buscar la orden de compra ' + err);
		}
	}

    async postOrder( user, data, numberOrd ) {
		const orderToPost = {
			author: {
                username: user.username,
                phoneNumber: user.phoneNumber,
                address: user.address,
            },
			numOrder: numberOrd,
            items: data,
            date: new Date()
		};
		
		const orderPost = new modelOrders(orderToPost)
		const result = await orderPost.save();
		
		logger.info('se guardo la orden');
		
		return result;
	}
}
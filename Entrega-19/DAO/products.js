import logger from '../services/logger.js';
import modelProduc from './models/modelsProduc.js';
import connectMongo from '../DAO/config/dataMongo.js';

connectMongo();

export default class daoProducts {
	async add(data) {
		try {
			const dataAdd = new modelProduc(data);
			const add = await dataAdd.save(dataAdd);
			return add;
		} catch (err) {
			logger.error('Error al guardar el producto ' + err);
		}
	}

	async get(name, id) {
		try {
			if (name) {
				const data = await modelProduc.find({ name: name });
				return data;
			}else if (id) {
				const data = await modelProduc.find({ _id: id });
				return data;
			} else {
				const data = await modelProduc.find();
				return data;
			}
		} catch (err) {
			logger.error('Error al burcar los productos ' + err);
		}
	}

	async update(id, data) {
		try {
			const update = await modelProduc.updateOne({ _id: id }, data);
			return update;
		} catch (err) {
			logger.error('Error al burcar y actualizar los productos ' + err);
		}
	}

	async delete(id) {
		try {
			const deelete = await modelProduc.deleteOne({ _id: id });
			return deelete;
		} catch (err) {
			logger.error('Error al burcar y eliminar los productos ' + err);
		}
	}
}
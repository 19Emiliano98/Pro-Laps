import logger from '../services/logger.js';

import
	{ 
		isUserNeutral, isUserAdmin, noneUser,
		newProduct, updateProduct, deleteProduct
	}
from '../services/products.js';

export const get = (req, res) => {
	const { url, method, user } = req;
	const admin = req.user.admin
	const avatar = req.user.photo;
	const saludo = `Bienvenido ${req.user.userName}`;
	
	logger.info(`Ruta ${method} ${url}`);
	
	isUserNeutral( user );
	isUserAdmin( admin, saludo, avatar );
	noneUser( saludo, avatar )
};

export const getB = (req, res) => {
	const name = req.body.nameb.charAt(0).toUpperCase() + req.body.nameb.slice(1);
	const { url, method } = req;
	logger.info(`Ruta ${method} ${url}`);
	if (req.user === undefined) {
		return products.get(name)
			.then((productos) => {
				res.render('User/productosUser', { productos });
			})
			.catch((err) => {
				res.json(err);
			});
	}
	const user = req.user.username;
	const avatar = req.user.photo;
	const saludo = `Bienvenido ${user}`;
	if (req.user?.admin) {
		return products
			.get(name)
			.then((productos) => {
				res.render('Admin/productosAdmin', { productos, saludo, avatar });
			})
			.catch((err) => {
				res.json(err);
			});
	}
	products
		.get(name)
		.then((productos) => {
			res.render('UserLogin/productosUserLogin', { productos, saludo, avatar });
		})
		.catch((err) => {
			res.json(err);
		});
};

export const add = (req, res) => {
	const { url, method, body } = req;
	
	logger.info(`Ruta ${method} ${url}`);
	
	newProduct(body);
};

export const update = (req, res) => {
	const { url, method, body } = req;
	const id = req.params.id;
	
	logger.info(`Ruta ${method} ${url}`);
	
	updateProduct( body, id )
};

export const Delete = (req, res) => {
	const { url, method } = req;
	const id = req.params.id;
	
	logger.info(`Ruta ${method} ${url}`);
	
	deleteProduct( id )
};
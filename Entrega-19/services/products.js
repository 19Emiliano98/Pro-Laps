import containerProducts from '../DAO/products.js';

const products = new containerProducts();

export const isUserNeutral = ( url, method, user ) => {
    logger.info(`Ruta ${method} ${url}`);
    if (user === undefined) {
		return products.get()
			.then((products) => {
				res.render('User/productosUser', { products });
			})
			.catch((err) => {
				res.json(err);
			});
	}
}

export const isUserAdmin = ( admin, saludo, avatar ) => {
    if ( admin === undefined || null ) {
		return products.get()
			.then((products) => {
				res.render('Admin/productosAdmin', { products, saludo, avatar });
			})
			.catch((err) => {
				res.json(err);
			});
	}
}

export const noneUser = ( saludo, avatar ) => {
    products.get()
		.then((products) => {
			res.render('UserLogin/productosUserLogin', { products, saludo, avatar });
		})
		.catch((err) => {
			res.json(err);
		});
}
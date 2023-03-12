import containerProducts from '../DAO/products.js';

const products = new containerProducts();

export const isUserNeutral = ( user ) => {
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
    return products.get()
		.then((products) => {
			res.render('UserLogin/productosUserLogin', { products, saludo, avatar });
		})
		.catch((err) => {
			res.json(err);
		});
}

export const newProduct = ( body ) => {
    const newProduct = {
		timestamp: Date.now(),
		name: body.name.toLowerCase().charAt(0).toUpperCase() + body.name.slice(1),
		description: body.description,
		code: body.code,
		price: body.price,
		photo: body.photo,
		stock: body.stock,
	};
	return products.add(newProduct)
		.then(() => {
			res.redirect('/productos');
		})
		.catch((err) => {
			res.json(err);
		});
}

export const updateProduct = ( body, id ) => {
    const newProduct = {
		timestamp: Date.now(),
		name: body.name,
		description: body.description,
		code: body.code,
		price: body.price,
		photo: body.photo,
		stock: body.stock,
	};
	return products.update(id, newProduct)
		.then(() => {
			res.redirect('/productos');
		})
		.catch((err) => {
			res.json(err);
		});
}

export const deleteProduct = ( id ) => {
    return products.delete(id)
		.then(() => {
			res.redirect('/productos');
		})
		.catch((err) => {
			res.json(err);
		});
}
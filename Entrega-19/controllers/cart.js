import daoCart from '../DAO/cart.js';
import daoProducts from '../DAO/products.js';

const carrito = new daoCart();
const producto = new daoProducts();

export const getCarrito = (req, res) => {
	const correo = req.user.username;
	const user = req.user.username;
	const avatar = req.user.photo;
	const saludo = `Bienvenido ${user}`;
	carrito
		.getCart(correo)
		.then((carritos) => {
			console.log(carritos);
			res.render('UserLogin/carrito', { carritos, avatar, saludo });
		})
		.catch((err) => {
			res.json(err);
		});
};

export const postProductoCarrito = (req, res) => {
	const idProducto = req.body.id;
	const idCarrito = req.user.username;
	const newCart = {
		author: {
			name: req.user.name,
			lastName: req.user.lastName,
			address: req.user.address,
			phoneNumber: req.user.phoneNumber,
			username: req.user.username,
		},
		productos: [],
		timestamp: String,
	};
	carrito.addCart(newCart).then(() => {
		producto
			.get(idProducto)
			.then((producto) => {
				let product = producto;
				carrito.updateCart(idCarrito, { $push: { productos: product } });
			})
			.catch((err) => {
				res.json(err);
			});
	});
};
export const deleteProductoCarrito = (req, res) => {
	const idProducto = req.body.id;
	const idCarrito = req.user.username;

	producto
		.get(idProducto)
		.then((producto) => {
			let product = producto;
			carrito
				.updateCart(idCarrito, { $pull: { productos: product } })
				.then((carrito) => {
					res.json(carrito);
				})
				.catch((err) => {
					res.json(err);
				});
		})
		.catch((err) => {
			res.json(err);
		});
};

export const deleteCarrito = (req, res) => {
	carrito
		.deleteCart(req.user.username)
		.then((id) => {
			res.json({ id: id });
		})
		.catch((err) => {
			res.json(err);
		});
};
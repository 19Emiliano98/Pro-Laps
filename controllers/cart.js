import logger from '../services/logger.js';

import daoUser from '../Database/DAO/user.js';
import daoCart from '../Database/DAO/cart.js';
import productDB from '../Database/DAO/products.js';

const user = new daoUser();
const cart = new daoCart();
const products = new productDB();

const getCarrito = async (req, res) => {
	const { url, method } = req;
	logger.info(`Ruta ${method} ${url}`);
	
	const Correo = req.user.username;
	const avatar = req.user.photo;
	const saludo = `Bienvenido ${Correo}`;
	
	const result = await user.get(Correo)
	
	const shopCart = await cart.getCart(Correo);
	const transform = shopCart.map(x => x.productos)
	const productos = transform.flat()
	
	res.render('UserLogin/carrito', { result, avatar, saludo, productos });
};

const postProductoCarrito = async (req, res) => {
	const { url, method } = req;
	logger.info(`Ruta ${method} ${url}`);
	
	const pid = req.body.id;
	const mail = req.user.username;
	const cartContent = await cart.getCart(mail);
	const data = await products.get(pid);
	let aux = [];
	
	// El if va a comprobar si el usuario ya tiene un carrito creado o no
	if(cartContent.length == 0){
		await cart.addCart(req.user); //con esto creo un carrito 
	}
	
	cartContent.forEach(p => p.productos.forEach(x => aux.push(x._id)));
	const search = aux.find( x => x == pid );
	
	if( search !== undefined ){
		console.log('ya tengo el producto, sumame una unidad');
		cart.increment(mail)
	}else{
		console.log('No tengo este producto, creamelo');
		await cart.addProductCart(mail, data);
		cart.addCantToCart(mail);
	}
	
	res.redirect('/products');
};

const emptyCart = (req, res) => {
	const { url, method, user, params } = req;
	logger.info(`Ruta ${method} ${url}`);

	const correo = user.username;
	const resultProduct = params;

	cart.emptyCart( correo, resultProduct );
	res.redirect('/cart');
};

const deleteCarrito = (req, res) => {
	const mail = req.user.username;
	
	cart.deleteCart( mail )
		.then((id) => {
			res.json({ id: id });
		})
		.catch((err) => {
			res.json(err);
		});
};

export { getCarrito, postProductoCarrito, emptyCart, deleteCarrito };
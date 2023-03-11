import session from '../services/landing.js';

export const nonExistentRoute = (req, res) => {
	const { url, method } = req;
	logger.warn(`Ruta ${method} ${url} no esta implementada`);
	res.send(`Ruta ${method} ${url} no esta implementada`);
};

export const redirection = (req, res) => {
	res.redirect('/inicio');
};

export const getStart = (req, res) => {
	const { url, method } = req;
	const user = req.user.username;
	const avatar = req.user.photo;
	const saludo = `Bienvenido ${user}`;
	session.start( method, url, user, avatar, saludo );
};

export const getLogout = (req, res) => {
	const { url, method } = req;
	const user = req.user.username;
	session.logout( method, url, user );
};
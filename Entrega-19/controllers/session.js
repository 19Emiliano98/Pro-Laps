import session from '../services/session.js';

export const getSignUp = (req, res) => {
	const { url, method } = req;
	session.signUp( method, url );
};

export const getErrorRegister = (req, res) => {
	const { url, method } = req;
	session.getErrorRegister( method, url );
};

export const getSingIn = (req, res) => {
	const { url, method } = req;
	session.getErrorRegister( method, url );
};

export const getLogout = (req, res) => {
	const { url, method } = req;
	const user = req.user.username;
	session.logout( method, url, user );
};

export const getStart = (req, res) => {
	const { url, method } = req;
	const user = req.user.username;
	const avatar = req.user.photo;
	const saludo = `Bienvenido ${user}`;
	session.start( method, url, user, avatar, saludo );
};

export const getErrorLogin = (req, res) => {
	const { url, method } = req;
	session.errorLogin( method, url );
};
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
	session.singIn( method, url );
};

export const getErrorLogin = (req, res) => {
	const { url, method } = req;
	session.errorLogin( method, url );
};
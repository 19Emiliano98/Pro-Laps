import logger from './logger.js';

export const signUp = ( method, url ) => {
    logger.info(`Ruta ${method} ${url}`);
	if (req.isAuthenticated()) {
		return res.redirect('/products'); // route
	}
	return res.render('User/register'); // archivo pug
}

export const getErrorRegister = ( method, url ) => {
    logger.info(`Ruta ${method} ${url}`);
	return res.render('User/registerError'); // archivo pug
}

export const singIn = ( method, url ) => {
    logger.info(`Ruta ${method} ${url}`);
	if (req.isAuthenticated()) {
		return res.redirect('/products');
	}
	return res.render('User/login');
}

export const errorLogin = () => {
    logger.info(`Ruta ${method} ${url}`);
	return res.render('User/login-error');
}

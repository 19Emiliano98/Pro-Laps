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

export const SingIn = ( method, url ) => {
    logger.info(`Ruta ${method} ${url}`);
	if (req.isAuthenticated()) {
		return res.redirect('/products');
	}
	return res.render('User/login');
}

export const logout = ( method, url, user ) => {
    logger.info(`Ruta ${method} ${url}`);
	req.logout((err) => {
		const saludo = `Hasta luego ${user}`;
		return res.render('saludo', { saludo });
	});
}

export const start = () => {
    logger.info(`Ruta ${method} ${url}`);
	if (req.user === undefined) {
		return res.render('User/inicioUser');
	}
	if (req.user?.admin) {
		return res.render('Admin/inicioAdmin', { saludo, avatar });
	}
	return res.render('UserLogin/inicioUserLogin', { saludo, avatar });
}

export const errorLogin = () => {
    logger.info(`Ruta ${method} ${url}`);
	return res.render('User/login-error');
}

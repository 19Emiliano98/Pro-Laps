export const start = ( method, url, user, avatar, saludo ) => {
	logger.info(`Ruta ${method} ${url}`);
	if (user === undefined) {
		return res.render('User/inicioUser');
	}
	if (req.user?.admin) {
		return res.render('Admin/inicioAdmin', { saludo, avatar });
	}
	return res.render('UserLogin/inicioUserLogin', { saludo, avatar });
}

export const logout = ( method, url, user ) => {
    logger.info(`Ruta ${method} ${url}`);
	req.logout((err) => {
		const saludo = `Hasta luego ${user}`;
		return res.render('saludo', { saludo });
	});
}

const chat = ( avatar, saludo ) => {
    if (req.user?.username) {
        return res.render('UserLogin/mensajes', {saludo, avatar});
    }
    if (req.user?.admin) {
        return res.render('Admin/mensajes', {saludo, avatar});
    }
    res.redirect("/")
}
import { Router } from 'express';
import controller from '../controllers/session.js';
import passport from 'passport';
import multer from "multer";

const register = Router();
const login = Router();
const inicio = Router();
const salir = Router();

const upload = multer({ dest: './public/img/uploads/' });

inicio.get('/', controller.getInicio);

passport.use('register', register);
passport.use('login', login);

register.get('/', controller.getSignUp);
register.post('/', upload.single('photo'), passport.authenticate('register', { failureRedirect: 'register/errorRegistro', successRedirect: '/home' }));
register.get('/registrationError', controller.getErrorRegister);

login.get('/', controller.getSingIn);
login.post('/', passport.authenticate('login', { failureRedirect: '/login/errorLogin', successRedirect: '/home' }));
login.get('/errorLogin', controller.getErrorLogin);

salir.get('/', controller.getLogout, deleteCarrito ); // deleteCarrito sale de controlerCart del trabajo anterior

export { register, login };
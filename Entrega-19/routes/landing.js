import { Router } from 'express';
import landing from '../controllers/landing.js';

const start = Router();
const goOut = Router();
const notExist = Router();
const redirect = Router();

notExist.get('/', landing.nonExistentRoute);
redirect.get('/', landing.redirection);
start.get('/', landing.getStart);
goOut.get('/', landing.getLogout, deleteCarrito ); // deleteCarrito sale de controlerCart del trabajo anterior tengo que activarlo

export { start, goOut, notExist, redirect };
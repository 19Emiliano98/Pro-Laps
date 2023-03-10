import express from 'express';
import dotenv from 'dotenv';

import { register, login } from './routes/session.js';
import { start, goOut, notExist, redirect } from './routes/landing.js';
import products from './routes/products.js';
import cart from './routes/cart.js';

dotenv.config();

const app = express();

app.set('views', './views');
app.set('view engine', 'pug');

app.use('*', notExist);// 
app.use('/', redirect);//
app.use('/register', register);//
app.use('/login', login);//
app.use('/home', start);//
app.use('/products', products);//
app.use('/cart', cart)//
app.use('/chat', messages);
app.use('/exit', goOut);//

httpServer.listen(PORT, () => {
	logger.info(`RUN http://localhost:${PORT} processID: ${process.pid}`);
});
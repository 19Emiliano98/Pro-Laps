import express from 'express';
import { register, login } from './routes/session.js';
//import router from '';

const app = express();

app.set('views', './views');
app.set('view engine', 'pug');

app.use('*', notExist);
app.use('/', redirect);
app.use('/register', register);
app.use('/login', login);
app.use('/home', home);
app.use('/products', products);
app.use('/cart', cart)
app.use('/messages', messages);
app.use('/exit', exit);

httpServer.listen(PORT, () => {
	logger.info(`RUN http://localhost:${PORT} processID: ${process.pid}`);
});
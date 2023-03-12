import { Router } from 'express';
import authentication from './middlewares/authentication.js';

import { get, getB, add, update, Delete } from '../DAO/products.js';

const products = Router();

products.get('/', get);
products.post('/busqueda', getB);
products.post('/', authentication, add);
products.put('/:id', authentication, update);
products.delete('/:id', authentication, Delete);

export default products
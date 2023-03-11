import { Router } from 'express';
import authentication from './middlewares/authentication.js';

const cart = Router();

cart.get("/", authentication, getCart);
cart.post("/", authentication, postProductoCart);
cart.delete("/", authentication, deleteProductoCart);

export default cart;
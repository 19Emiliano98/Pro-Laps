import express from 'express';
import ProductosRouter from './faker/fakeRoutes';

const app = express()

app.use(express.json())

app.use('/api/productos-test', new ProductosRouter())

const PORT = 8080
app.listen(PORT, () => {
    console.log('servidor escuchando')
})
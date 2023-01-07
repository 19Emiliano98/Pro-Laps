import express from 'express'
import ApiProductosMock from '../api/usuarios.js'

class ProductosRouter extends express.Router {
    constructor() {
        super()

        const apiProductos = new ApiProductosMock()

        this.post('/popular', async (req, res, next) => {
            try {
                const cant = Number(req.query.cant) || 50
                res.json(await apiProductos.popular(cant))
            } catch (error) {
                next(error)
            }
        })

        this.get('/', async (req, res, next) => {
            try {
                res.json(await apiProductos.listarTodos())
            } catch (error) {
                next(error)
            }
        })

        this.get('/:id', async (req, res, next) => {
            try {
                res.json(await apiProductos.listar(req.params.id))
            } catch (error) {
                next(error)
            }
        })

        this.post('/', async (req, res, next) => {
            try {
                res.json(await apiProductos.guardar(req.body))
            } catch (error) {
                next(error)
            }
        })

        this.put('/:id', async (req, res, next) => {
            try {
                res.json(await apiProductos.actualizar({...req.body, id: req.params.id}))
            } catch (error) {
                next(error)
            }
        })

        this.delete('/:id', async (req, res, next) => {
            try {
                res.json(await apiProductos.borrar(req.params.id))
            } catch (error) {
                next(error)
            }
        })
    }
}

export default ProductosRouter
const express = require('express')
const app = express()
const { Router } = express
const PORT = 8080

app.use(express.json())                             //  Esto sirve para que la aplicacion 
app.use(express.urlencoded({ extended: true }))     //        pueda leer los .JSON

app.use('/prodUp', express.static(__dirname + '/public/index.html'))   //  Static usado para mandar archivos cualesquiera  (html, css, img, etc...) - staticRoute se usa para asignarle un prefijo

//app.set('views', './views')
app.set('view engine', 'ejs')


const productos = []

const routerProductos = new Router()

routerProductos.get('/ejs', (req, res) => {
    res.render('nivel.ejs', { suggestedProds: productos })
})

routerProductos.post('/', (req, res) => {
    
    if(productos.length === 0 ){
        const products = req.body
        products.id = 1
        productos.push(products)
    }else{
        let id = productos[productos.length - 1].id + 1
        let prod = req.body
        prod.id = id
        productos.push(req.body)
    }
    
    res.redirect("./prodUp")
    /* res.json({ok: 'ok'}) */
})

routerProductos.get('/:id', (req, res) => {
    let id = req.params.id
    id = parseInt(id)
    
    if (isNaN(id)) {
        return res.json( {error: "El parametro ingresado no es un numero"} )
    }
    
    const find = productos.find(element => element.id === id)
    
    if(find == null){
        return res.json( {error: "ID inexistente"} )
    }
    
    res.json( find )
})

routerProductos.put('/:id', (req, res) => {
    const id = req.params.id
    id = parseInt(id)
    const replaced = req.body
    
    if (isNaN(id)) {
        return res.json( {error: "El parametro ingresado no es un numero"} )
    }
    
    const find = productos.find(element => element.id === id)
    
    const index = productos.indexOf(find)
    
    productos.splice(index, 1, replaced)
    
    res.json({ok: 'refreshed'})
})

routerProductos.delete('/:id', (req, res) => {
    let id = req.params.id
    id = parseInt(id)
    
    if (isNaN(id)) {
        return res.json( {error: "El parametro ingresado no es un numero"} )
    }
    
    const index = productos.indexOf(productos.find(element => element.id === id))
    
    productos.splice(index, 1)
    
    res.json({
        result:'ok',
        id: req.params.id
    })
})

app.use('/productos', routerProductos)

const server = app.listen(PORT, () => {
    console.log('Servidor escuchando en puerto: ' + PORT)
})
const fs = require('fs')
const productFile = "./Productos.txt";

class Contenedor {
    
    constructor( ruta ){    // an Array
        this.ruta = ruta    //object
    }
    
    async save( producto ){
        try{
            if (fs.existsSync(productFile)) {
                let data = await fs.promises.readFile(productFile, "utf-8");
                let products = JSON.parse(data);
                let id = products[products.length - 1].id + 1;
                    producto.id = id;
                    products.push(producto);
                    await fs.promises.writeFile( productFile, JSON.stringify(products, null, 2) );
                return console.log({ status: "Perfecto", message: "Producto creado" });
            } else {
                producto.id = 1;
                await fs.promises.writeFile( productFile, JSON.stringify([producto], null, 2) );
                return console.log({ status: "Perfecto", message: "Producto creado" });
            }
        } catch (err) {
            return console.log({status: 'Error', message: err.message})
        }
    }

    getById = async(id) => {
        if (!id) return console.log({status: 'error', message:'se requiere ID'})
            if (fs.existsSync(productFile)){
                let data = await fs.promises.readFile(productFile, 'utf-8')
                let products = JSON.parse(data)
                let product = products.find(product => product.id === id)
                    if (product) return console.log({status: 'Perfecto', message: product})
                        return console.log({status:'error', message: 'No se reconoce el ID'}) 
                    } else {
                        return console.log({status: 'error', message: err.message})
                    }
    }

    getById = async(id) => {
        if (!id) return {status: 'error', message:'se requiere ID'}
        if (fs.existsSync(productFile)){
            let data = await fs.promises.readFile(productFile, 'utf-8')
            let products = JSON.parse(data)
            let product = products.find(product => product.id === id)
            if (product) return console.log({status: 'Perfecto', message: product})
            return console.log({status:'error', message: 'No se reconoce el ID'})
        } else {
            return console.log({status: 'error', message: err.message})
        }
    }
   
    getAll = async () => {
        if (fs.existsSync(productFile)){
            let data = await fs.promises.readFile(productFile, 'utf-8')
            let products = JSON.parse(data)
            return console.log({status: 'Perfecto', message: products})
    } else {
        return console.log({status: 'error', message: err.message})
    }
}

    deleteAll = async (product) => {
        if (fs.existsSync(productFile)){
            let data = await fs.promises.readFile(productFile, 'utf-8')
            let products = JSON.parse(data)
            await fs.promises.unlink(productFile, JSON.stringify())
            return console.log({status: 'Perfecto', message: 'base de datos eliminada'})
        }

    deleteById = async (id) => {
        if (!id) return console.log({status: 'error', message: 'Necesita un ID'})
        if (fs.existsSync(productFile)){
            let data = await fs.promises.readFile(productFile, 'utf-8')
            let products = JSON.parse(data)
            let newProduct = products.filter(product => product.id !== id)
            await fs.promises.writeFile(productFile, JSON.stringify(newProduct, null, 2 ))
            return console.log({status: 'Perfecto', message: 'ID BORRADA'})
        }else {
            return console.log({status: 'error', message: err.message})
        }
    }
}
}

const File = new Contenedor([]) //content of all

File.save( { nombre: "PC", precio: 500, thumbnail: "aaa" } )
File.getById(2)
File.getAll()
File.deleteAll(2)
File.deleteById(1)
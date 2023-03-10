import ContenedorMemoria from "../contenedores/ContenedorMemoria.js"
import { generarProducto } from '../utils/utils.js'

class ApiProductosMock extends ContenedorMemoria {
    constructor() {
        super()
    }

    popular(cant) {
        const nuevos = []
        for (let i = 0; i < cant; i++) {
            const usuarioNuevo = generarProducto()
            const guardado = this.guardar(usuarioNuevo)
            nuevos.push(guardado)
        }
        return nuevos
    }
}

export default ApiProductosMock
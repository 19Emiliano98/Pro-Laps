import { faker } from '@faker-js/faker'
faker.locale = 'es'

function generarProducto() {
    return {
        nombre: faker.commerce.productName(),
        precio: faker.commerce.price(),
        img: faker.internet.url()
    }
}

export { generarProducto }
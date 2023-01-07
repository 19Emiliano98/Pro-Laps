import { faker } from '@faker-js/faker'
faker.locale = 'es'

function generarUsuario() {
    return {
        nombre: faker.ecommerce.product(),
        precio: faker.ecommerce.price(),
        img: faker.internet.url()
    }
}

export { generarUsuario }
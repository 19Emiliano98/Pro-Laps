import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import logger from './logger.js';

dotenv.config();

const { USER, PASS } = process.env;

async function sendMailOrder(dataOrd){
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: USER,
            pass: PASS
        }
    });
    
    const mailOptions = {
        from: 'Servidor Node.js',
        to: USER,
        subject: 'Nuevo Orden Registrada',
        html:   `<h1 style="color: black;">
                    Se ha registrado una nueva orden
                </h1>
                <p>
                    Detalle del producto, en proceso de correccion
                </p>
                `
    } 
    
    try {
        const mensaje = await transporter.sendMail(mailOptions)
        logger.info(mensaje);
    } catch (error) {
        logger.error(error)
    }
}

export { sendMailOrder }
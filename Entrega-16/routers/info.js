import { Router } from "express";
import os from 'os';
import compression from 'compression';
import logger from '../logger.js'

const Argumentos = process.argv.slice(2);
const Plataforma = process.platform;
const Version = process.version;
const Memoria = process.memoryUsage().rss;
const Path = process.execPath;
const Id = process.pid;
const Carpeta = process.cwd();
const numCPUs = os.cpus().length

const datos = {
    Argumentos: Argumentos,
    CPUS: `Usados actualmente ${numCPUs}`,
    Plataforma: `Sistema operativo ${Plataforma}`,
    Version: `Version de node ${Version}`.repeat(10), // hago un repeat para que se pueda apreciar que compression esta funcionando
    Memoria: `Memoria total usada ${Memoria}`,
    Path: `Path de ejecucion ${Path}`,
    Id: `Id del proceso actual de trabajo ${Id}`,
    Carpeta: `Carpeta actual del proyecto ${Carpeta}`,
};

const info = Router();

info.get("/", (req, res) => {
    res.send(datos);
    logger.info('Route /info access granted')
});

info.get("/gzip", compression() ,(req, res) => {
    res.send(datos);
    logger.info('Route /info/gzip access granted')
});

export default info;
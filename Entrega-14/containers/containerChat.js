import mongoose from "mongoose";
import modelsChat from "../models/modelsChat.js";
import dotenv from 'dotenv';

dotenv.config()

const modo = process.env.MODE ?? 'prod'
const puerto = process.env.PORT ?? 0
const debug = process.env.DEBUG == 'true' ? true : false

const dataBase = process.env.MONGOCONNECT
const urlPars = process.env.URLPARS
const unified = process.env.UNIFIED

console.log({
    modo,
    puerto,
    debug,
    dataBase,
    urlPars,
    unified
})

mongoose.set('strictQuery', false);
mongoose.connect( dataBase, {
    useNewUrlParser: urlPars,
    useUnifiedTopology: unified,
}, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("MongoDB Connected");
    }
});

export default class Container {

    async getChat(){
        const data = await modelsChat.find({}, {_id:0, __v:0});
        return data;
    };

    async addChat(data){
        const dataAdd = new modelsChat(data);
        const add = await dataAdd.save();
        return add;
    };

};
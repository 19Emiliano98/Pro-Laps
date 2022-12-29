import mongoose from "mongoose";

const URL = ""

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

console.log("conectados correctamente")
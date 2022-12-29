// Mi DB
const { config } = require ("./config/mysqlconfig")
const ClienteSQL = require ("./methods/sqlContainer")

const { configChat } = require ("./config/sqlite3config.js")

// Configs para usar express / sockets.io / JSON
const express = require('express');
const app = express();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 8080;

const handlebars = require('express-handlebars');
const path =  require('path');
const viewsFolder = path.join(__dirname,"views");

// Abro mi servidor local
const server = app.listen(PORT, ()=>console.log(`Server Port ${PORT}`));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"))

app.engine("handlebars", handlebars.engine());
app.set("views", viewsFolder);
app.set("view engine", "handlebars");

// Empiezo a armar la DB incorporando Websockets
const sql = new ClienteSQL(config)
const sqlChat = new ClienteSQL(configChat)

const io = new Server(server);

sql.crearTabla();
sqlChat.crearChat();

io.on("connection", async(socket) => {
    console.log("cliente conectado");
    
    //Products
    const products = await sql.listarArticulos();
    socket.emit("products", products);

    //Recibir Producto
    socket.on("newProduct", async(data)=>{
        await sql.insertarArticulos(data)
        
        //Enviar productos actualizados
        const products = await sql.listarArticulos();
        io.sockets.emit("products", products)
    })

    //Chat
    const chat = await sqlChat.listarChat();
    socket.emit("messagesChat", chat);

    //Recibir msg
    socket.on("newMsg", async(data)=>{
        await sqlChat.insertarChat(data)
        
        //enviar los mensajes a todos los socket conecta2
        const chat = await sqlChat.listarChat();
        io.sockets.emit("messagesChat", chat)
    })
});

app.get('/', (req,res) => {
    res.render("home")
})
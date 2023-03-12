import chat from '../services/chat.js';
import { getChat, addChat } from '../DAO/chat.js';

export const textChat = () => {
    const user = req.user.username;
    const avatar = req.user.photo;
    const saludo = `Bienvenido ${user}`;

    chat( avatar, saludo, user );
}

io.on('connection', async (socket) => {
    const listaMensajes = await chat.getChat();
    
    socket.emit('messages', listaMensajes);
    socket.on('new-message', async (data) => {
        
        if (listaMensajes.length === 0) {
            return await chat.addChat({
                ...data,
                fyh: new Date().toLocaleString(),
                id: 1,
            });
        }
        await chat.addChat({
            ...data,
            fyh: new Date().toLocaleString(),
            id: listaMensajes.length + 1,
        });
        io.sockets.emit('messages', listaMensajes);
    });
});
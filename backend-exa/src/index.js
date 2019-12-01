require('dotenv').config();//lectura de las variables de entorno

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const SocketIo = require('socket.io');
const cors = require('cors');
const axios = require('axios');


//initialization
const app = express();
require('./database');

//settings
app.set('port', process.env.PORT || 4000);

//Static files
app.use(express.static(path.join(__dirname,'public')));

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//ROUTES
app.use('/api/empleado', require('./routes/empleados.route'));//end point de empleados

//settings the server
const server = app.listen(app.get('port'), () => {
    console.log("Server on port ", app.get('port'));
});

const io = SocketIo(server);

io.on('connection', (socket) => {
    socket.on('fetchEmpleados', async () => {
        console.log("Recuperando empleado");
        try {
            const res = await axios.get('http://localhost:4000/api/empleado');
            await socket.emit('Empleados', res.data);
        } catch (error) {
            console.log(error);
        }
    });
});

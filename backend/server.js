const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const RoutesUsers = require('../backend/Routes/RoutesUsers');
const RoutesCar = require('../backend/Routes/RoutesCar');
const Cloudinary = require('./cloudinary');
const io = new Server(server, {
    cors: '*',
    methods: '*'
});
require('./connection');

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/users', RoutesUsers);
app.use('/cars', RoutesCar);
app.use('/images', Cloudinary);

server.listen(8080, ()=> {
    console.log('Server is running', 8080)
})
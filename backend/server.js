const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const RoutesUsers = require('../backend/Routes/RoutesUsers');
const RoutesCar = require('../backend/Routes/RoutesCar');
const RoutesRequests = require('./Routes/Routesrequests');
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
app.use('/requests', RoutesRequests)


app.post('/create-payment', async(req, res)=> {
    const {amount} = req.body;
    console.log(amount);
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        payment_method_types: ['card']
      });
      res.status(200).json(paymentIntent)
    } catch (e) {
      console.log(e.message);
      res.status(400).json(e.message);
     }
  })

server.listen(8080, ()=> {
    console.log('Server is running', 8080)
})
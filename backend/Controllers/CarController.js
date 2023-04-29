const Car = require("../Models/Car");
const Users = require("../Models/Users");
module.exports = {
    find: async(req, res)=> {
        try {
          const cars = await Car.find();
          res.status(200).json(cars);
        } catch (e) {
          res.status(400).send(e.message);
        }
    },

    addCar: async(req, res)=> {
        try {
          const {model, details, specs, price, category, pictures} =req.body;
          const car = await Car.create({model, details, specs, price, category, pictures})
          const cars = await Car.find();
          res.status(201).json(cars);
        } catch (e) {
          res.status(400).send(e.message);
        }
    },

    updateCar: async(req, res)=> {
        const {id} = req.params;
        try {
          const {model, details, specs, price, category, images: pictures} =req.body;
          const car = await Car.findByIdAndUpdate(id, {model, details, specs, price, category, pictures});
          const cars = await Car.find();
          res.status(200).json(cars);
        } catch (e) {
          res.status(400).send(e.message);  
        }
    },

    removeCar: async(req, res)=> {
        const {id} = req.params;
        try {
          await Car.findByIdAndDelete(id);
          const cars = await Car.find();
          res.status(200).json(cars);  
        } catch (e) {
          res.status(400).send(e.message);
        }
    },

    findSimilar: async(req, res)=> {
        const {id} = req.params;
        try {
          const car = await Car.findById(id);
          const similar = await Car.find({category: car.category}).limit(5);
          res.status(200).json({car, similar});
        } catch (e) {
          res.status(400).send(e.message);
        }
    },

   category: async(req,res)=> {
      const {category} = req.params;
      try {
        let cars;
        const sort = {'_id': -1}
        if(category == "all"){
          cars = await Car.find().sort(sort);
        } else {
          cars = await Car.find({category}).sort(sort)
        }
        res.status(200).json(cars)
      } catch (e) {
        res.status(400).send(e.message);
      }
    },

    addtocart: async(req, res)=> {
      const {userId, carId, price} = req.body;
    
      try {
        const user = await Users.findById(userId);
        const userCart = user.cart;
        if(user.cart[carId]){
          userCart[carId] = 1;
        } else {
          userCart[carId] = 1;
          userCart.count += 1;
          userCart.total = Number(userCart.total) + Number(price);
          user.cart = userCart;
          user.markModified('cart');
          await user.save();
          res.status(200).json(user);
        }
      } catch (e) {
        res.status(400).send(e.message);
      }
    },
    removecart: async(req, res)=> {
      const {userId, carId, price} = req.body;
      try {
        const user = await Users.findById(userId);
        const userCart = user.cart;
        userCart.total -= Number(userCart[carId]) * Number(price);
        userCart.count -= userCart[carId];
        delete userCart[carId];
        user.cart = userCart;
        user.markModified('cart');
        await user.save();
        res.status(200).json(user);
      } catch (e) {
        res.status(400).send(e.message);
      }
    }
}
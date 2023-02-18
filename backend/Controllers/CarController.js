const Car = require("../Models/Car");
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
    }
}
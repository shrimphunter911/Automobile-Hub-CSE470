const router = require('express').Router();
const {find, addCar, updateCar, removeCar, findSimilar, category, addtocart, removecart} = require("../Controllers/CarController");

router.get('/', find);

router.post('/', addCar);

router.patch('/:id', updateCar);

router.delete('/:id', removeCar);

router.get('/:id', findSimilar);

router.get('/category/:category', category);

router.post('/add-to-cart', addtocart);

router.post('/remove-from-cart', removecart);

module.exports = router;
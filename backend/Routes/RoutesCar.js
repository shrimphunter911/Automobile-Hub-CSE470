const router = require('express').Router();
const {find, addCar, updateCar, removeCar, findSimilar} = require("../Controllers/CarController");

router.get('/', find);

router.post('/', addCar);

router.patch('/:id', updateCar);

router.delete('/:id', removeCar);

router.get('/:id', findSimilar);

module.exports = router;
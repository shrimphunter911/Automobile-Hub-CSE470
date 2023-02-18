const mongoose = require("mongoose");
const CarSchema = mongoose.Schema(
  {
    model: {
      type: String,
      required: [true, "required"],
    },
    details: {
      type: String,
      required: [true, "required"],
    },
    specs: {
      type: String,
      required: [true, "required"],
    },
    price: {
      type: String,
      required: [true, "required"],
    },
    category: {
      type: String,
      required: [true, "required"],
    },
    pictures: {
      type: Array,
      required: true,
    },
  },
  { minimize: false }
);

const Car = mongoose.model("Car", CarSchema);
module.exports = Car;

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const consoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
});

consoleSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Console', consoleSchema);
const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    receipeName: {
    type: String,
    required: true
  },
  receipeTime: {
    type: String,
    required: true
  },
  ingredeints: {
    type: Array,
    required: true
  },
  serves: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Recipe', RecipeSchema);




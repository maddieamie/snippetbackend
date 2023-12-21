const mongoose = require('mongoose');

const { Schema } = mongoose;

const poemRowSchema = new Schema({
  value: {
    type: String,
    default: '',
  },
  occupied: {
    type: Boolean,
    default: false,
  },
}); 

const poemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  poem: [[poemRowSchema]], // Array of arrays with objects inside each row
  email: {
    type: String,
    required: true,
  },
});

const Poem = mongoose.model('Poem', poemSchema);

module.exports = Poem;

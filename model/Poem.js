'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const poemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  poem: [
    {
      value: {
        type: String,
        default: '',
      },
      occupied: {
        type: Boolean,
        default: false,
      },
    },
  ],
  email: {
    type: String,
    required: true,
  }
});

const Poem = mongoose.model('Poem', poemSchema);

module.exports = Poem;

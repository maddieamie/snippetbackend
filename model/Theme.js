const mongoose = require('mongoose');

const themeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    theme: {
        type: String,
        required: true
    },
    phrases: [{
        type: String
    }]
});

module.exports = mongoose.model('Theme', themeSchema);

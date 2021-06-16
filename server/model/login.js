const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: String,
    password: {
        type: String,
        default: '111111'
    }
})

const login = mongoose.model('login', schema);

module.exports = login;
const { Schema, model } = require('mongoose');

const msgSchema = new Schema({
    author: {
        id: {type: String, required: true, max: 40},
        firstName: {type: String, required: true, max: 40},
        lastName: {type: String, required: true, max: 40},
        age: {type: Number, required:true},
        alias: {type: String, required: true, max: 40},
        avatar: {type: String, required: true},
        date: {type: String, required: true}
    },
    text: {type: String, required: true, max: 255}
})

const msgModel = model('Message', msgSchema);

module.exports = msgModel;
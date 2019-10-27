const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    listname: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    removed: {
        type: String,
        required: true
    }
});

const List = mongoose.model('List', listSchema);

module.exports = List;
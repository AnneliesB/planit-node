const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listItemSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    id: {
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

const ListItem = mongoose.model("ListItem", listItemSchema);
module.exports = ListItem;
const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema({
    todoDesc: String,
    todoDate: Date,
    completed: Boolean,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('ToDo', todoSchema);
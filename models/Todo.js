const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema({
    todoDesc: String,
    todoDate: Date,
    completed: Boolean,
    priority: {
        type: 'String',
        enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
        default: 'LOW'
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('ToDo', todoSchema);
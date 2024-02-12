const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    status: { type: String, required: true },
    dueDate: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const TaskModel = mongoose.model('Task', TaskSchema);
module.exports = TaskModel;

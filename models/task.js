const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define task schema which will be used to create task model
const taskSchema = new Schema({
    title: {
        type: String,
        minlength: 10,
        maxLength: 100,
        required: true
    },
    duration: { type: String, required: true },
    difficulty: { type: String, required: true },
    description: {
        type: String,
        minlength: 50,
        maxLength: 500,
        required: true
    },
    completed: { type: Boolean, required: true }
});

taskSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString(),
        delete returnedObj._id,
        delete returnedObj.__v
    }
});

// create task model which extends task schema
const Task = mongoose.model('Task', taskSchema);

// export task model
module.exports = Task;
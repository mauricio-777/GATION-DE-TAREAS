const mongoose = require('mongoose');


const Task = mongoose.model('Task', 
    {
        name: String,
        url: String,
        visible: Boolean,
        archived: Boolean
    }
);

module.exports = Task

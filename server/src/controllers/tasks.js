const Task = require("../model/Task")

async function getTasks(req, res) {
    const tasks = await Task.find()
    res.json(tasks)
}

async function createTask(req, res) {
    const task = req.body // informacion que llega desde el cliente
    const temp =  await Task.create(task);
    res.json(temp)
}

async function updateTask(req, res) {
    const id = req.params.linkId
    const task = req.body

    await Task.findByIdAndUpdate(id, task)

    res.json({
        message: "link updated successfully!",
        data: task
    })
}

async function deleteTask(req, res) {
    const id = req.params.linkId
    await Task.findByIdAndDelete(id)
    
    res.json({
        message: "link deleted successfully!"
    })
}


module.exports = {
    getLinks: getTasks,
    createLink: createTask,
    updateLinkById: updateTask,
    deleteLinkById: deleteTask
}
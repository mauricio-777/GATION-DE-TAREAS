const express = require('express')

const { getLinks: getTask, createLink: createTask, updateLinkById: updateTask, deleteLinkById: deleteTask } = require('../controllers/tasks')

const router = express.Router()

router.get('/api/links', getTask)
router.post('/api/links', createTask)
router.put('/api/links/:linkId', updateTask)
router.delete('/api/links/:linkId', deleteTask)

module.exports = router
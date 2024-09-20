const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Get all chats for a user
router.get('/', chatController.getChats);

// Create a new chat
router.post('/', chatController.createChat);

module.exports = router;

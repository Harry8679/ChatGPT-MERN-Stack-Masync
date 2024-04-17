const express = require('express');
const isAuthenticated = require('../middlewares/isAuthenticated.middleware');
const { openAIController } = require('../controllers/openAI.controller');
const openAIRouter = express.Router();

openAIRouter.post('/generate-content', isAuthenticated, openAIController);

module.exports = openAIRouter;
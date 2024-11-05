const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Route to create a question
router.post('/', async (req, res) => {
    try {
        const { description, testCases } = req.body;
        const question = new Question({ description, testCases });
        await question.save();
        res.status(201).json({ message: 'Question saved successfully', question });
    } catch (error) {
        res.status(500).json({ error: 'Error saving question' });
    }
});

// Route to get the latest question
router.get('/last', async (req, res) => {
    try {
        const question = await Question.findOne().sort({ _id: -1 });
        if (!question) {
            return res.status(404).json({ error: 'No questions found' });
        }
        res.json(question);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching question' });
    }
});

module.exports = router;

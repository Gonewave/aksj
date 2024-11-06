const express = require('express');
const router = express.Router();
const Test = require('../models/Test'); // Adjust the path to your Test model

// Get tests based on status
router.get('/tests', async (req, res) => {
    try {
        const completedTests = await Test.find({ started: true, ended: true });
        const scheduledTests = await Test.find({ started: false });
        const runningTests = await Test.find({ started: true, ended: false });

        res.json({ completedTests, scheduledTests, runningTests });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tests' });
    }
});

// Start a test
router.post('/tests/:id/start', async (req, res) => {
    try {
        const testId = req.params.id;
        const test = await Test.findByIdAndUpdate(
            testId,
            { started: true, conductedon: new Date() },
            { new: true }
        );
        res.json(test);
    } catch (error) {
        res.status(500).json({ error: 'Failed to start the test' });
    }
});

// End a test
router.post('/tests/:id/end', async (req, res) => {
    try {
        const testId = req.params.id;
        
        const test = await Test.findById(testId);

        // Check if `conductedon` is not set, and if not, set it with the current date
        if (!test.conductedon) {
            test.conductedon = new Date();
        }

        test.ended = true;
        
        await test.save();
        res.status(200).json({ message: 'Test ended successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error ending the test' });
    }
});

module.exports = router;

const mongoose = require('mongoose');

const TestCaseSchema = new mongoose.Schema({
    input: { type: String, required: true },
    expectedOutput: { type: String, required: true }
});

const QuestionSchema = new mongoose.Schema({
    description: { type: String, required: true },
    testCases: [TestCaseSchema]
});

module.exports = mongoose.model('Question', QuestionSchema);

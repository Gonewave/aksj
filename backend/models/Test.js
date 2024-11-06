const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
    testname: {
        type: String,
        required: true
    },
    createdon: {
        type: Date,
        default: Date.now
    },
    conductedon: {
        type: Date
    },
    started: {
        type: Boolean,
        default: false
    },
    ended: {
        type: Boolean,
        default: false
    },
    questions: [{
        type: mongoose.Schema.Types.Mixed  // Adjust as needed, e.g., { questionText: String, options: [String], correctAnswer: String }
    }],
    report: [{
        type: mongoose.Schema.Types.Mixed  // Adjust as needed, e.g., { userId: String, score: Number, passed: Boolean }
    }]
});

module.exports = mongoose.model('Test', TestSchema);

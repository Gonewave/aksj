const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const cors = require('cors');
const bodyParser = require('body-parser');
const questionRoutes = require('./routes/questionRoutes');
const testRoutes = require('./routes/test');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://gonewave:Cj7andpotcawe%40123@cluster0.uvsahex.mongodb.net/code_exam', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

  
  app.use(express.static(path.join(__dirname, "..",'client/build'))); // Adjust the path according to your directory structure

// Routes
app.use('/api/questions', questionRoutes);
app.use('/api',testRoutes);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html')); // Adjust the path according to your directory structure
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // if you have a DB connection file
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

// Mount routes
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

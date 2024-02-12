require('dotenv/config');
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./db/db');


const app = express();


const port = process.env.PORT || 4000;

const corsOptions = {
  origin: 'https://www.decktask.onrender.com', 
  optionsSuccessStatus: 200,
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));

app.use(express.json());

const taskRoutes = require('./routes/task');
const authRoutes = require('./routes/auth');
const mediaRoutes = require('./routes/media');

app.use('/api/task', taskRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/media', mediaRoutes);

app.use(errorHandler);

connectDB(process.env.MONGO_URL);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

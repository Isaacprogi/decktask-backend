require('dotenv/config');
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./db/db');


const app = express();


const port = process.env.PORT || 4000;

const allowedOrigins = ['https://decktask.onrender.com'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}

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

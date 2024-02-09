require('dotenv/config');
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./db/db');
const Task = require('./models/Task'); 
const { Server } = require('socket.io');
const http = require('http');

const app = express();

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const checkUpcomingTasks = async () => {
  const threeDaysFromNow = new Date();
  threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);

  try {
    const upcomingTasks = await Task.find({
      dueDate: { $lte: threeDaysFromNow },
    });

    // Emit notifications for upcoming tasks
    io.emit('upcomingTasksNotification', upcomingTasks);
  } catch (error) {
    console.error('Error checking for upcoming tasks:', error);
  }
};


// Schedule the check for upcoming tasks (you might want to use a scheduler library like cron for production)
setInterval(checkUpcomingTasks, 24 * 60 * 60 * 1000);

const port = process.env.PORT || 4000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());

// Assuming you have these route handlers properly implemented
const taskRoutes = require('./routes/task');
const authRoutes = require('./routes/auth');
const mediaRoutes = require('./routes/media');

app.use('/api/task', taskRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/media', mediaRoutes);

app.use(errorHandler);

connectDB(process.env.MONGO_URL);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

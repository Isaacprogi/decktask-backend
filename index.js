require('dotenv/config')
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'isaaconyes80@gmail.com',
    pass: process.env.PASS,
  },
  pool: true,
});

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateContactForm = (req, res, next) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  next(); // Proceed to the next middleware or route handler
};

app.post('/api/contact', validateContactForm, async (req, res) => {
  const formData = req.body;

  const emailContent = `
    Name: ${formData.name}
    Email: ${formData.email}
    Subject: ${formData.subject}
    Message: ${formData.message}
  `;

  const mailOptions = {
    from: 'isaaconyes80@gmail.com',
    to: 'isaaconyes80@gmail.com',
    subject: 'New Contact Form Submission',
    text: emailContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Sent' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

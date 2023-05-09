const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()
const authRoutes = require('./routes/authRoutes');
const booksRoutes = require('./routes/bookRoutes');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({msg: "hello from server"});
});

app.use("/api/auth", authRoutes);
app.use("/api/books", booksRoutes);


mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.log(`MongoDB connection error: ${err}`);
});



const PORT = process.env.PORT; 

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


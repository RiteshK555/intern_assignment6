const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// CREATE
router.post('/', async (req, res) => {
  try {
    const { title, author, description,  userId } = req.body;
    const book = new Book({ title : title, description : description, author: author, userId: userId });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// READ
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Route for searching books by title
router.get('/search', async (req, res) => {
  const { title } = req.query;
  const books = await Book.find({ title: { $regex: `^${title}`, $options: 'i' } });
  res.json(books);
});

router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send('Book not found');
    }
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const { title, description, author, userId } = req.body;
    const book = await Book.findByIdAndUpdate(req.params.id, { title : title, description : description, author: author, userId: userId }, { new: true });
    if (!book) {
      return res.status(404).send('Book not found');
    }
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).send('Book not found');
    }
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

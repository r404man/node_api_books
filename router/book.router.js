const express = require('express');

const bookController = require('../controller/book.controller.js');

const router = express.Router();

// @route /books
// @desc  Return all books objects
router.get('/books', bookController.getAllBooks);

// @route /books/details/:id
// @desc Return detail book where id === /:id
router.get('/books/details/:id', bookController.getBook);

router.post('/book/addbook', bookController.addBook);

module.exports = router;
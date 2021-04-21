const express = require('express');

const authorController = require('../controller/author.controller.js');
// test
const router = express.Router();

// @route /authors
// @desc Send all authors data(objects)
router.get('/authors', authorController.getAllAuthors);

// @route /authors/author/:id
// @desc Send author object
router.get('/author/:id', authorController.getAuthor);

// @route /authors/addauthor/:id
// @desc Create author item in db where id === /:id
router.post('/addauthor', authorController.addAuthor);

// @route /author/:id
// @desc Delete author item from db
router.delete('/author/:id', authorController.deleteAuthor);

// @route /author/edit/:id
// @desc Edit author item in db where id === /:id 
router.put('/author/edit/:id', authorController.editAuthor);

module.exports = router;

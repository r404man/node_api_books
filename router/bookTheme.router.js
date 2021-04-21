const express = require('express');

const bookThemeController = require('../controller/bookTheme.controller');

const router = express.Router();

router.get('/themes', bookThemeController.getAllThemes);

router.get('/theme/:id', bookThemeController.getTheme);

router.post('/addtheme', bookThemeController.addTheme);

router.delete('/theme/:id', bookThemeController.deleteTheme);

router.put('/theme/edit/:id', bookThemeController.editTheme);

module.exports = router;




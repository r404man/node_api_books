const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');

// Add your own config file 
require('dotenv').config();

const BookRouter = require('./router/book.router');
const AuthorRouter = require('./router/author.router');
const ThemeRouter = require('./router/bookTheme.router');

const app = express();
const port = process.env.PORT;


// Fetch data from remoute server 
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use('/', ThemeRouter);
app.use('/', BookRouter);
app.use('/', AuthorRouter);

app.listen(port, console.log(`Server is running ${port}`));
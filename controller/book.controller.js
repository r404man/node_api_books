const { pool } = require('../config/dbconnect');
const bookThumbController = require('./bookThumb.controller');
const Dumper = require('../test/tester');

class BookController {
    constructor() { };

    async getAllBooks(req, res) {
        try {
            const order = `select b.id, b.name, b.description, a.name as author, btb.url as thumb_url, bt.name as theme, b.price from books b 
                   right join books_theme bt on b.book_theme_id = bt.id 
                   right join authors a on b.author_id = a.id 
                   right join books_thumbnail btb on b.id = btb.book_id;`;
            const data = await pool.query(order);
            console.log(data.rows);
            res.json(data.rows);
        } catch (err) {
            console.error(err.stack)
        }
    }

    async getBook(req, res) {
        try {
            const id = req.params.id;
            const order = `select b.id, b.name, b.description, a.name as author, btb.url as thumb_url, bt.name as ganre, b.price from books b 
                   right join books_theme bt on b.book_theme_id = bt.id 
                   right join authors a on b.author_id = a.id 
                   right join books_thumbnail btb on b.id = btb.book_id 
                   where b.id = $1;`;
            const data = await pool.query(order, [id]);
            res.json(data.rows[0]);
            return res;
        } catch (err) {
            console.error(err.stack)
        }
    }

    async addBook(req, res) {
        try {
            if (Dumper.isEmpty(req.body, res)) return;
            if (Dumper.isEqual(req.body, ["name", "description", "author_id", "book_theme_id", "price", "book_thumb_url"])) {
                const { name, description, author_id, book_theme_id, price, book_thumb_url } = req.body;
                const order = `Insert into books(name, description, author_id, book_theme_id, price)
                               values($1, $2, $3, $4, $5) returning *;`;
                const data = await pool.query(order, [name, description, Number(author_id), Number(book_theme_id), price]);
                const bookId = data.rows[0].id;
                bookThumbController.addThumb(book_thumb_url, bookId)
                res.json({ id: bookId, status: 200 });
            }
        } catch (err) {
            console.error(err.stack);
            Dumper.errorHandler('Addbook func', 500, res);
        }
    }
}

module.exports = new BookController();

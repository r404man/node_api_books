const { pool } = require('../config/dbconnect');

class BookThumbController {
    getThumb() {

    }

    async addThumb(id, url) {
        try {
            const order = `Insert into books_thumbnail(url, book_id) 
        values($1, $2) returning *;`;
            await pool.query(order, [id, url]);
        } catch (err) {
            console.error(err.stack);
        }
    }
}

module.exports = new BookThumbController();
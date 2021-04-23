const { pool } = require('../config/dbconnect');

class BookThemeController {
    async getAllThemes(req, res) {
        try {
            const order = `Select * from books_theme;`;
            const data = await pool.query(order);
            res.json(data.rows);
        } catch (err) {
            console.error(err.stack)
        }
    }

    async getTheme(req, res) {
        try {
            const id = req.params.id
            const order = `Select * from books_theme where id = $1;`
            const data = await pool.query(order, [id]);
            res.json(data.rows[0]);
        } catch (err) {
            console.error(err.stack);
        }
    }

    async addTheme(req, res) {
        try {
            const { name } = req.body;
            const order = `Insert into books_theme(name) 
            values($1) returning *;`;
            const data = await pool.query(order, [name]);
            res.json(data.rows);
        } catch (err) {
            console.error(err.stack)
        }
    }

    async deleteTheme(req, res) {
        try {
            const id = req.params.id;
            const order = `Delete from books_theme where id = $1 returning *;`;
            const data = await pool.query(order, [id]);
            res.json(data);
        } catch (err) {
            console.error(err.stack)
        }
    }

    async editTheme(req, res) {
        try {
            const id = req.params.id;
            const { name } = req.query;
            const order = `Update books_theme set name = $1 where id = $2 returning *;`;
            const data = await pool.query(order, [name, id]);
            res.json(data.rows[0]);
        } catch (err) {
            console.error(err.stack)
        }
    }
}

module.exports = new BookThemeController();
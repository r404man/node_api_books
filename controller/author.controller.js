const { pool } = require('../config/dbconnect');

class AuthorController {

    async getAllAuthors(req, res) {
        try {
            const order = `Select * from authors`;
            const data = await pool.query(order);
            res.json(data.rows);
        } catch (err) {
            console.error(err.stack);
        }
    }

    async getAuthor(req, res) {
        try {
            const id = req.params.id;
            const order = `Select * from authors where id = $1;`;
            const data = await pool.query(order, [id]);
            res.json(data.rows[0])
        } catch (err) {
            console.error(err.stack);
        }
    }

    async addAuthor(req, res) {
        try {
            const { name, date_of_birth } = req.query;
            const order = `Insert into authors(name, date_of_birth) 
            values($1, $2) returning *;`;
            const data = await pool.query(order, [name, date_of_birth]);
            res.json(data.rows);
        } catch (err) {
            console.error(err.stack)
        }
    }

    async deleteAuthor(req, res) {
        try {
            const id = req.params.id;
            console.log(id);
            const order = `Delete from authors where id = $1 returning *;`;
            const data = await pool.query(order, [id]);
            res.json(data.rows);
        } catch (err) {
            console.error(err.stack)
        }
    }

    async editAuthor(req, res) {
        try {
            const id = req.params.id;
            const { name, date_of_birth } = req.query;
            console.log(id, name, date_of_birth, "Req Querry")
            const order = `Update authors set name = $1, date_of_birth = $2 
            where id = $3 returning *`;
            const data = await pool.query(order, [name, date_of_birth, id]);
            res.json(data.rows);
        } catch (err) {
            console.log(err.stack)
        }
    }
}

module.exports = new AuthorController();
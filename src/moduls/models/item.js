const db = require('../../db/dbConnection');

// Define the Student model
const Student = {
    getAll: (callback) => {
        const query = 'SELECT * FROM student';
        db.query(query, callback);
    },

    getById: (id, callback) => {
        const query = 'SELECT * FROM student WHERE id = ?';
        db.query(query, [id], callback);
    },

    create: (data, callback) => {
        const query = 'INSERT INTO student (name, email, password) VALUES (?, ?, ?)';
        db.query(query, [data.name, data.email, data.password], callback);
    },

    update: (id, data, callback) => {
        const query = 'UPDATE student SET name = ?, email = ?, password = ? WHERE id = ?';
        db.query(query, [data.name, data.email, data.password, id], callback);
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM student WHERE id = ?';
        db.query(query, [id], callback);
    }
};

module.exports = Student;

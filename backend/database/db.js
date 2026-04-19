const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(__dirname, "database.sqlite");

const db = new sqlite3.Database(dbPath);


const dbAsync = {
  run: (sql, params = []) =>
    new Promise((resolve, reject) => {
      db.run(sql, params, function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      });
    }),

  all: (sql, params = []) =>
    new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    }),

  get: (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  }),

  delete: (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.run(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve({ changes: this.changes });
    });
  }),

  update: (sql, params = []) => 
  new Promise((resolve, reject) => {
    db.run(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve({ changes: this.changes });
    });
  })
};


module.exports = {
  db,
  dbAsync
};
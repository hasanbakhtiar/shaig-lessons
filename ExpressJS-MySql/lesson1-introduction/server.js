const express = require('express');
const app = express();
const connection = require('./config/connect.js');
app.use(express.json());
// https://sidorares.github.io/node-mysql2/docs/examples/queries/simple-queries

app.get('/products', (req, res) => {
  connection.query('SELECT * FROM products ORDER BY title DESC', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post('/products', (req, res) => {
  const sql = `INSERT INTO products (title, price,description) VALUES ("${req.body.title}", ${req.body.price}, "${req.body.description}")`;

  connection.query(sql, (err, result, fields) => {
    if (err instanceof Error) {
      console.log(err);
      res.send(err);
      return;
    }

    res.send(result, fields);
  });
});


app.put('/products/:id', (req, res) => {
const sql = `UPDATE products SET title = "${req.body.title}" WHERE id = ${req.params.id} LIMIT 1`;

  connection.query(sql, (err, result, fields) => {
      if (err instanceof Error) {
            res.send(err);
            return;
          }

      res.send(result,fields);
  });
});

app.listen(3000, () => {
  console.log('Express app running on port 3000');
});

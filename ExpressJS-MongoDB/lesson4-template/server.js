const express = require('express');
const app = express();
const path = require('path');
const homeRoute = require('./routes/home.js');
const contactRoute = require('./routes/contact.js');

app.use('/libs', express.static(path.join(__dirname, 'node_modules')));
app.use('/static', express.static(path.join(__dirname, 'views/assets')));

// app.use((req, res) => {
//   res.sendFile(path.join(__dirname, './views/404.html'));
// });
app.use('/contact', contactRoute);
app.use('/', homeRoute);

app.listen(3000, () => {
  console.log('Running port on 3000');
});

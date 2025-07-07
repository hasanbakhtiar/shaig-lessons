//req ----------------------middleware1 --------------------------middleware2------------------middleware3 ------------> res

const express = require('express');
const app = express();

// app.use((req, res, next) => {
//   console.log('middleware1');
//   next();
// });
//
// app.use((req, res, next) => {
//   console.log('middleware2');
//   next();
// });
//
// app.use((req, res, next) => {
//   console.log('middleware3');
//   next();
// });
//
// app.use((req, res) => {
//   console.log('middleware4');
//   res.send('hello world');
// });


const user = {
  title: 'hasan',
  pass: 'hasan123',
};

app.get('/', (req, res) => {
  res.send('home page');
});

app.get('/login', (req, res, next) => {
  if (user.title === 'hasan' && user.pass === 'hasan123') {
    console.log('success')
    next();
  } else {
    res.send('Wrong');
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});

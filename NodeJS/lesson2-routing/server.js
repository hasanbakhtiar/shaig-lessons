const http = require('http');
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('home page');
  } else if (req.url === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('about page');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write('not found page');
  }
  res.end();
});

server.listen(3000);
console.log('nodejs server at port 3000');

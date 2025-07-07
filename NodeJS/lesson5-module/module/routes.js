const routeHandle = (req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('home page10');
  } else if (req.url === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('about page');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write('not found page');
  }
  res.end();
};

module.exports = routeHandle;

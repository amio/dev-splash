const fs = require('fs');
const path = require('path');

const RETRY_AFTER = '5';
const indexHTML = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

module.exports = (req, res) => {
  const accepts = req.headers.accept.split(',');

  if (accepts.includes('text/html')) {
    sendHTML(res);
  } else {
    sendText(res);
  }
};

function sendHTML (res) {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Retry-After', RETRY_AFTER);

  res.writeHead(503);
  res.end(indexHTML);
}

function sendText (res) {
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Retry-After', RETRY_AFTER);

  res.writeHead(503);
  res.end('503: Waiting for instantiation...');
}

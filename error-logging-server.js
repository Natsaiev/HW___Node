import fs from 'fs';
import http from 'http';

const server = http.createServer((req, res) => {
    try {
        throw new Error('Something went wrong');
    } catch(err) {
        fs.appendFile('errors.log', `${new Date().toISOString()} - ${err.message}\n`, (err) => {
    if (err) {
        console.error(err);
    }
    });
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Internal Server Error');
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
})
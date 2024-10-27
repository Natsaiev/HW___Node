import http from 'http';


const PORT = 3000;
const server = http.createServer((req, res) => {
    const authHeader = req.headers['authorization'];
    console.log('Authorization header:', authHeader);

    if (authHeader) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Authorization header logged\n');
    } else {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Unauthorized\n');
    }
})

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
})
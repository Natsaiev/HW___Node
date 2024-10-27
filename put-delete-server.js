import http from 'http';


const PORT = 3000;

const server = http.createServer((req, res) => {
    if (req.method === 'PUT') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('PUT request received');
    } else if (req.method === 'DELETE') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('DELETE request received');
    } else {
        res.statusCode = 405;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Method not allowed');
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
})
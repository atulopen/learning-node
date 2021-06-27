const http = require('http');
const PORT = 3000;

const server = http.createServer();

const friends = [
    {
        id: 0,
        name: 'Iron Man'
    },
    {
        id: 1,
        name: 'Spider Man'
    },
    {
        id: 2,
        name: 'Captain America'
    }
]

server.on('request', (req, res) => {

    const params = req.url.split('/');

    if (req.method === 'POST' && params[1] === 'friends') {
        req.on('data', (data) => {
            const friend = data.toString();
            console.log(`Request:`, friend);
            friends.push(JSON.parse(friend));
        });
        req.pipe(res);
    } else if (req.method === 'GET' && params[1] === 'friends') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        if (params.length === 3) {
            const friendId = Number(params[2]);
            const friend = friends[friendId];
            res.end(JSON.stringify(friend));
        } else {
            res.end(JSON.stringify(friends));
        }
    } else if (req.method === 'GET' && params[1] === 'messages') {

        res.setHeader('Content-Type', 'text/html');
        res.write('<html>')
        res.write('<body>')
        res.write('<ul>')
        res.write('<li>Line 1</li>')
        res.write('<li>Line 2</li>')
        res.write('</body>')
        res.write('</html>')

        res.end();
    } else {
        res.statusCode = 404;
        res.end();
    }

})

server.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});


import {createServer} from 'http'
import {parse} from 'url'
import {viewLogs, viewSiswa, listSiswa, addSiswa, deleteSiswa, editSiswa} from './file.service'

const server = createServer((req, res) => {
    const url = parse(req.url);
    switch(url.pathname) {
        case '/siswa':
            viewSiswa(req, res);
            break;
        case '/siswa/list':
            listSiswa(req, res);
            break;
        case '/siswa/add':
            addSiswa(req, res);
            break;
        case '/siswa/delete':
            deleteSiswa(req, res);
            break;
        case '/siswa/update':
            editSiswa(req, res);
            break;
        case '/logs':
            viewLogs(req, res);
            break;
        default:
            res.statusCode = 404;
            res.end;
    }
});

server.listen(3000);
console.log('Server running on http://localhost:3000');
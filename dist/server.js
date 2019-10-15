"use strict";
exports.__esModule = true;
var http_1 = require("http");
var url_1 = require("url");
var file_service_1 = require("./file.service");
var server = http_1.createServer(function (req, res) {
    var url = url_1.parse(req.url);
    switch (url.pathname) {
        case '/siswa':
            file_service_1.viewSiswa(req, res);
            break;
        case '/siswa/list':
            file_service_1.listSiswa(req, res);
            break;
        case '/siswa/add':
            file_service_1.addSiswa(req, res);
            break;
        case '/siswa/delete':
            file_service_1.deleteSiswa(req, res);
            break;
        case '/siswa/update':
            file_service_1.editSiswa(req, res);
            break;
        case '/logs':
            file_service_1.viewLogs(req, res);
            break;
        default:
            res.statusCode = 404;
            res.end;
    }
});
server.listen(3000);
console.log('Server running on http://localhost:3000');

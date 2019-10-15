"use strict";
exports.__esModule = true;
var url_1 = require("url");
var file_1 = require("./file");
function viewSiswa(req, res) {
    var url = url_1.parse(req.url, true);
    var query = url.query;
    //check data name
    if (!query['name']) {
        res.statusCode = 400;
        res.end();
        return;
    }
    //write logs
    var log = file_1.getTime() + '- User melihat detail siswa.\n';
    var status = file_1.tulisLogs(log);
    if (!status) {
        res.statusCode = 400;
        res.end();
        return;
    }
    console.log('Sukses menulis logs. ');
    res.end();
}
exports.viewSiswa = viewSiswa;
function listSiswa(req, res) {
    var url = url_1.parse(req.url, true);
    var query = url.query;
    //write logs
    var log = file_1.getTime() + '- User melihat list siswa.\n';
    var status = file_1.tulisLogs(log);
    if (!status) {
        res.statusCode = 400;
        res.end();
        return;
    }
    console.log('Sukses menulis logs.');
    res.end();
}
exports.listSiswa = listSiswa;
function addSiswa(req, res) {
    var url = url_1.parse(req.url, true);
    var query = url.query;
    //check data name
    if (!query['name'] || !query['classroom']) {
        res.statusCode = 400;
        res.end();
        return;
    }
    //write logs
    var log = file_1.getTime() + ("- User menambahkan siswa " + query['name'] + ".\n");
    var status = file_1.tulisLogs(log);
    if (!status) {
        res.statusCode = 400;
        res.end();
        return;
    }
    console.log('Sukses menulis logs.');
    res.end();
}
exports.addSiswa = addSiswa;
function deleteSiswa(req, res) {
    var url = url_1.parse(req.url, true);
    var query = url.query;
    //check data name
    if (!query['name']) {
        res.statusCode = 400;
        res.end();
        return;
    }
    //write logs
    var log = file_1.getTime() + ("- User menghapus siswa " + query['name'] + ".\n");
    var status = file_1.tulisLogs(log);
    if (!status) {
        res.statusCode = 400;
        res.end();
        return;
    }
    console.log('Sukses menulis logs.');
    res.end();
}
exports.deleteSiswa = deleteSiswa;
function editSiswa(req, res) {
    var url = url_1.parse(req.url, true);
    var query = url.query;
    //check data name
    if (!query['name'] || !query['classroom']) {
        res.statusCode = 400;
        res.end();
        return;
    }
    //write logs
    var log = file_1.getTime() + ("- User mengubah kelas " + query['name'] + " menjadi " + query['classrom'] + ".\n");
    var status = file_1.tulisLogs(log);
    if (!status) {
        res.statusCode = 400;
        res.end();
        return;
    }
    console.log('Sukses menulis logs.');
    res.end();
}
exports.editSiswa = editSiswa;
function viewLogs(req, res) {
    var url = url_1.parse(req.url, true);
    var query = url.query;
    console.log(query);
    var status = file_1.bacaLogs();
    if (!status) {
        res.statusCode = 400;
        res.end();
        return;
    }
    res.write(status);
    res.end();
}
exports.viewLogs = viewLogs;

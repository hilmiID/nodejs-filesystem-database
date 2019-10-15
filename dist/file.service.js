"use strict";
exports.__esModule = true;
var url_1 = require("url");
var file_1 = require("./file");
var sqlite_1 = require("./sqlite");
var dbSiswa = new sqlite_1.SQLite('./assets/siswa.db');
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
    //post to database
    var data = { name: query['name'].toString(), classroom: query['classroom'].toString() };
    var statusDb = dbSiswa.insert(data);
    console.log(statusDb);
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
    var result = file_1.bacaLogs();
    if (!result.status) {
        res.statusCode = 400;
        res.end();
        return;
    }
    res.write(result.data);
    res.end();
}
exports.viewLogs = viewLogs;

"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var filename = './assets/logs.txt';
function tulisLogs(data) {
    try {
        fs_1.writeFileSync(filename, data, { flag: 'a' });
        return true;
    }
    catch (err) {
        console.log('Error saat menulis: ' + err);
        return false;
    }
}
exports.tulisLogs = tulisLogs;
function bacaLogs() {
    try {
        var bacaan = fs_1.readFileSync(filename);
        return { 'status': true, 'data': bacaan.toString() };
    }
    catch (err) {
        console.log("Error saat membaca: " + err);
        return { 'status': false, 'data': null };
    }
}
exports.bacaLogs = bacaLogs;
function getTime() {
    var a = new Date(Date.now());
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = a.getMonth() + 1;
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + '-' + month + '-' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
}
exports.getTime = getTime;

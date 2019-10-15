"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var url_1 = require("url");
var file_1 = require("./file");
var sqlite_1 = require("./sqlite");
var dbSiswa = new sqlite_1.SQLite('./assets/siswa.db');
function viewSiswa(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var url, query, log, status, name, result, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = url_1.parse(req.url, true);
                    query = url.query;
                    //check data name
                    if (!query['name']) {
                        res.statusCode = 400;
                        res.end();
                        return [2 /*return*/];
                    }
                    log = file_1.getTime() + '- User melihat detail siswa.\n';
                    status = file_1.tulisLogs(log);
                    name = query['name'].toString();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, dbSiswa.getRowPromise(name)];
                case 2:
                    result = _a.sent();
                    res.write(JSON.stringify(result));
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.log('promise getRow error: ' + err_1);
                    res.write(err_1.toString());
                    return [3 /*break*/, 4];
                case 4:
                    //check status
                    if (!status) {
                        res.statusCode = 400;
                        res.end();
                        return [2 /*return*/];
                    }
                    console.log('Sukses menulis logs. ');
                    res.end();
                    return [2 /*return*/];
            }
        });
    });
}
exports.viewSiswa = viewSiswa;
function listSiswa(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var url, query, log, status, result, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = url_1.parse(req.url, true);
                    query = url.query;
                    log = file_1.getTime() + '- User melihat list siswa.\n';
                    status = file_1.tulisLogs(log);
                    if (!status) {
                        res.statusCode = 400;
                        res.end();
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, dbSiswa.getRowsPromise()];
                case 2:
                    result = _a.sent();
                    res.write(JSON.stringify(result));
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    console.log('promise getRow error: ' + err_2);
                    res.write(err_2.toString());
                    return [3 /*break*/, 4];
                case 4:
                    console.log('Sukses menulis logs.');
                    res.end();
                    return [2 /*return*/];
            }
        });
    });
}
exports.listSiswa = listSiswa;
function addSiswa(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var url, query, log, status, data, result, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = url_1.parse(req.url, true);
                    query = url.query;
                    //check data name
                    if (!query['name'] || !query['classroom']) {
                        res.statusCode = 400;
                        res.end();
                        return [2 /*return*/];
                    }
                    log = file_1.getTime() + ("- User menambahkan siswa " + query['name'] + ".\n");
                    status = file_1.tulisLogs(log);
                    data = { name: query['name'].toString(), classroom: query['classroom'].toString() };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, dbSiswa.insertPromise(data)];
                case 2:
                    result = _a.sent();
                    res.write(result);
                    return [3 /*break*/, 4];
                case 3:
                    err_3 = _a.sent();
                    console.log('promise insert error: ' + err_3);
                    res.write(err_3.toString());
                    return [3 /*break*/, 4];
                case 4:
                    if (!status) {
                        res.statusCode = 400;
                        res.end();
                        return [2 /*return*/];
                    }
                    console.log('Sukses menulis logs.');
                    res.end();
                    return [2 /*return*/];
            }
        });
    });
}
exports.addSiswa = addSiswa;
function deleteSiswa(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var url, query, log, status, result, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = url_1.parse(req.url, true);
                    query = url.query;
                    //check data name
                    if (!query['name']) {
                        res.statusCode = 400;
                        res.end();
                        return [2 /*return*/];
                    }
                    log = file_1.getTime() + ("- User menghapus siswa " + query['name'] + ".\n");
                    status = file_1.tulisLogs(log);
                    if (!status) {
                        res.statusCode = 400;
                        res.end();
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, dbSiswa.deletePromise(query['name'].toString())];
                case 2:
                    result = _a.sent();
                    res.write(result);
                    return [3 /*break*/, 4];
                case 3:
                    err_4 = _a.sent();
                    console.log('promise delete error: ' + err_4);
                    res.write(err_4.toString());
                    return [3 /*break*/, 4];
                case 4:
                    console.log('Sukses menulis logs.');
                    res.end();
                    return [2 /*return*/];
            }
        });
    });
}
exports.deleteSiswa = deleteSiswa;
function updateSiswa(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var url, query, log, status, data, result, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = url_1.parse(req.url, true);
                    query = url.query;
                    //check data name
                    if (!query['name'] || !query['classroom']) {
                        res.statusCode = 400;
                        res.end();
                        return [2 /*return*/];
                    }
                    log = file_1.getTime() + ("- User mengubah kelas " + query['name'] + " menjadi " + query['classrom'] + ".\n");
                    status = file_1.tulisLogs(log);
                    if (!status) {
                        res.statusCode = 400;
                        res.end();
                        return [2 /*return*/];
                    }
                    data = { name: query['name'].toString(), classroom: query['classroom'].toString() };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, dbSiswa.updatePromise(data)];
                case 2:
                    result = _a.sent();
                    res.write(result);
                    return [3 /*break*/, 4];
                case 3:
                    err_5 = _a.sent();
                    console.log('promise update error: ' + err_5);
                    res.write(err_5.toString());
                    return [3 /*break*/, 4];
                case 4:
                    console.log('Sukses menulis logs.');
                    res.end();
                    return [2 /*return*/];
            }
        });
    });
}
exports.updateSiswa = updateSiswa;
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

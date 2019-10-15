"use strict";
exports.__esModule = true;
var sqlite3_1 = require("sqlite3");
var SISWA_SORT_BY;
(function (SISWA_SORT_BY) {
    SISWA_SORT_BY["NAME"] = "name";
    SISWA_SORT_BY["CLASSROM"] = "classroom";
})(SISWA_SORT_BY = exports.SISWA_SORT_BY || (exports.SISWA_SORT_BY = {}));
var SORT_DIRECTION;
(function (SORT_DIRECTION) {
    SORT_DIRECTION["ASC"] = "ASC";
    SORT_DIRECTION["DESC"] = "DESC";
})(SORT_DIRECTION = exports.SORT_DIRECTION || (exports.SORT_DIRECTION = {}));
var SQLite = /** @class */ (function () {
    function SQLite(path) {
        this.db = new sqlite3_1.Database(path);
        var sql = "CREATE TABLE IF NOT EXISTS siswa(\n                id INTEGER PRIMARY KEY AUTOINCREMENT,\n                name TEXT,\n                classroom TEXT\n        )";
        this.db.run(sql, function (err) {
            if (err) {
                console.log("Gagal membuat tabel " + err);
            }
            console.log('Sukses membuat tabel.');
        });
    }
    SQLite.prototype.getRow = function (name, callback) {
        var sql = 'SELECT * FROM siswa WHERE name = ?';
        this.db.get(sql, [name], function (err, row) {
            if (err) {
                console.log('Error saat mengambil data siswa. ' + err);
                return;
            }
            console.log('sukses read database ' + row['name']);
            callback(err, row);
        });
    };
    SQLite.prototype.insert = function (data) {
        var sql = 'INSERT INTO siswa(name, classroom) VALUES (?, ?)';
        this.db.run(sql, [data.name, data.classroom], function (err) {
            if (err) {
                console.log('Gagal memasukkan nilai. ' + err);
                return;
            }
            console.log('Sukses menambah siswa');
        });
    };
    SQLite.prototype.getRows = function (sortBy, sortDirection, callback) {
        if (sortBy === void 0) { sortBy = SISWA_SORT_BY.NAME; }
        if (sortDirection === void 0) { sortDirection = SORT_DIRECTION.DESC; }
        var sql = "SELECT * FROM siswa ORDER BY " + sortBy + " " + sortDirection;
        this.db.all(sql, function (err, rows) {
            if (err) {
                console.log('Error saat mengambil data siswa. ' + err);
                return;
            }
            console.log('sukses read database ' + rows[0]['name']);
            callback(err, rows);
        });
    };
    SQLite.prototype.getRowPromise = function (name) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getRow(name, function (err, res) {
                if (err) {
                    console.log('getrowpromise error: ' + err);
                    reject(err);
                    return;
                }
                console.log('getRowPromise success: ' + res['name']);
                resolve(res);
            });
        });
    };
    SQLite.prototype.getRowsPromise = function (sortBy, sorDirection) {
        var _this = this;
        if (sortBy === void 0) { sortBy = SISWA_SORT_BY.NAME; }
        if (sorDirection === void 0) { sorDirection = SORT_DIRECTION.ASC; }
        return new Promise(function (resolve, reject) {
            _this.getRows(sortBy, sorDirection, function (err, res) {
                if (err) {
                    console.log('getrowspromise error: ' + err);
                    reject(err);
                    return;
                }
                console.log('getRowsPromise success: ' + res['name']);
                resolve(res);
            });
        });
    };
    SQLite.prototype.insertPromise = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var sql = 'INSERT INTO siswa(name, classroom) VALUES (?, ?)';
            _this.db.run(sql, [data.name, data.classroom], function (err, res) {
                if (err) {
                    console.log('Gagal memasukkan nilai. ' + err);
                    reject(err);
                    return;
                }
                console.log('Sukses menambah siswa. ' + res);
                resolve("Data sudah ditambahkan.");
            });
        });
    };
    SQLite.prototype.deletePromise = function (name) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var sql = "DELETE FROM siswa WHERE name='" + name + "'";
            _this.db.run(sql, function (err, res) {
                if (err) {
                    console.log('Gagal menghapus nilai. ' + err);
                    reject(err);
                    return;
                }
                console.log('Sukses menghapus siswa. ' + name);
                resolve("Data sudah dihapus.");
            });
        });
    };
    SQLite.prototype.updatePromise = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var sql = "\n            UPDATE siswa\n            SET classroom='" + data.classroom + "'\n            WHERE name = '" + data.name + "'\n            ";
            console.log(sql);
            _this.db.run(sql, function (err, res) {
                if (err) {
                    console.log('Gagal update nilai. ' + err);
                    reject(err);
                    return;
                }
                console.log('Sukses update kelas siswa. ' + data.name);
                resolve("Data sudah diupdate.");
            });
        });
    };
    return SQLite;
}());
exports.SQLite = SQLite;

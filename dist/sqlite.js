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
    SQLite.prototype.getRow = function (callback, name) {
        var sql = 'SELECT * FROM siswa WHERE name = ?';
        this.db.get(sql, [name], function (err, row) {
            if (err) {
                console.log('Error saat mengambil data siswa. ' + err);
                return;
            }
            callback(row);
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
    SQLite.prototype.getRows = function (callback, sortBy, sortDirection) {
        if (sortBy === void 0) { sortBy = SISWA_SORT_BY.NAME; }
        if (sortDirection === void 0) { sortDirection = SORT_DIRECTION.DESC; }
        var sql = "SELECT * FROM siswa ORDER BY " + sortBy + " " + sortDirection;
        this.db.all(sql, function (err, rows) {
            if (err) {
                console.log('Error saat mengambil data siswa. ' + err);
                return;
            }
            callback(rows);
        });
    };
    return SQLite;
}());
exports.SQLite = SQLite;

import {Database} from 'sqlite3';
import { resolve } from 'path';
import { rejects } from 'assert';

export enum SISWA_SORT_BY {
    NAME = 'name',
    CLASSROM = 'classroom'
}

export enum SORT_DIRECTION {
    ASC = 'ASC',
    DESC = 'DESC'
}

export interface Siswa{
    id?: number;
    name: string;
    classroom: string;
}

export class SQLite{
    db: Database;
    constructor(path: string) {
        this.db = new Database(path);
        const sql = `CREATE TABLE IF NOT EXISTS siswa(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                classroom TEXT
        )`;

        this.db.run(sql, (err) => {
            if(err) {
                console.log(`Gagal membuat tabel ${err}`);
            }

            console.log('Sukses membuat tabel.');
        });
    }

    getRow(name: string, callback: Function){
        const sql = 'SELECT * FROM siswa WHERE name = ?';
        this.db.get(sql, [name], (err, row) => {
            if(err){
                console.log('Error saat mengambil data siswa. '+err);
                return;
            }
            console.log('sukses read database '+row['name']);
            callback(err, row);
        })
    }

    insert(data: Siswa){
        const sql = 'INSERT INTO siswa(name, classroom) VALUES (?, ?)';
        this.db.run(sql, [data.name, data.classroom], (err)=>{
            if(err){
                console.log('Gagal memasukkan nilai. '+err);
                return;
            }
            console.log('Sukses menambah siswa');
        });
    }

    getRows(sortBy: SISWA_SORT_BY=SISWA_SORT_BY.NAME, sortDirection: SORT_DIRECTION=SORT_DIRECTION.DESC, callback: Function){
        const sql = `SELECT * FROM siswa ORDER BY ${sortBy} ${sortDirection}`;
        this.db.all(sql,(err, rows) => {
            if(err){
                console.log('Error saat mengambil data siswa. '+err);
                return;
            }
            console.log('sukses read database '+rows[0]['name']);
            callback(err, rows);
        })
    }

    getRowPromise(name: string) {
        return new Promise((resolve, reject) => {
            this.getRow(name, (err, res) => {
                if(err){
                    console.log('getrowpromise error: '+err);
                    reject(err);
                    return;
                }
                console.log('getRowPromise success: '+res['name'])
                resolve(res);
            })
        })
    }

    getRowsPromise(sortBy: SISWA_SORT_BY=SISWA_SORT_BY.NAME, sorDirection:SORT_DIRECTION=SORT_DIRECTION.ASC){
        return new Promise((resolve, reject) => {
            this.getRows(sortBy, sorDirection, (err, res) => {
                if(err){
                    console.log('getrowspromise error: '+err);
                    reject(err);
                    return;
                }
                console.log('getRowsPromise success: '+res['name'])
                resolve(res);
            })
        })
    }

    insertPromise(data: Siswa){
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO siswa(name, classroom) VALUES (?, ?)';
            this.db.run(sql, [data.name, data.classroom], (err, res)=>{
                if(err){
                    console.log('Gagal memasukkan nilai. '+err);
                    reject(err);
                    return;
                }
                console.log('Sukses menambah siswa. '+res);
                resolve("Data sudah ditambahkan.");
            });
        })
    }

    deletePromise(name: string){
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM siswa WHERE name='${name}'`;
            this.db.run(sql, (err, res)=>{
                if(err){
                    console.log('Gagal menghapus nilai. '+err);
                    reject(err);
                    return;
                }
                console.log('Sukses menghapus siswa. '+name);
                resolve("Data sudah dihapus.");
            });
        })
    }

    updatePromise(data: Siswa){
        return new Promise((resolve, reject) => {
            const sql = 
            `
            UPDATE siswa
            SET classroom='${data.classroom}'
            WHERE name = '${data.name}'
            `;
            console.log(sql);
            this.db.run(sql, (err, res)=>{
                if(err){
                    console.log('Gagal update nilai. '+err);
                    reject(err);
                    return;
                }
                console.log('Sukses update kelas siswa. '+data.name);
                resolve("Data sudah diupdate.");
            });
        })
    }
}
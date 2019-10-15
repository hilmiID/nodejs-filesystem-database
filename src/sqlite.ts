import {Database} from 'sqlite3';

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

    getRow(callback: Function ,name: string){
        const sql = 'SELECT * FROM siswa WHERE name = ?';
        this.db.get(sql, [name], (err, row) => {
            if(err){
                console.log('Error saat mengambil data siswa. '+err);
                return;
            }
            callback(row);
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

    getRows(callback: Function, sortBy: SISWA_SORT_BY=SISWA_SORT_BY.NAME, sortDirection: SORT_DIRECTION=SORT_DIRECTION.DESC){
        const sql = `SELECT * FROM siswa ORDER BY ${sortBy} ${sortDirection}`;
        this.db.all(sql,(err, rows) => {
            if(err){
                console.log('Error saat mengambil data siswa. '+err);
                return;
            }
            
            callback(rows);
        })
    }
}
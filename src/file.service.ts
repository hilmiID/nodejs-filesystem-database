import { IncomingMessage, ServerResponse } from "http";
import { parse } from 'url';
import { tulisLogs, bacaLogs, getTime } from './file';
import { SQLite, SISWA_SORT_BY, SORT_DIRECTION, Siswa } from './sqlite';
import {getRow} from './connect';

const dbSiswa = new SQLite('./assets/siswa.db');

export async function viewSiswa(req: IncomingMessage, res: ServerResponse){
    const url = parse(req.url, true);
    const query = url.query;

    //check data name
    if(!query['name']){
        res.statusCode = 400;
        res.end();
        return;
    }
    //write logs
    const log = getTime()+'- User melihat detail siswa.\n';
    const status = tulisLogs(log);
    //get data from database
    const name = query['name'].toString();
    try{
        const result = await dbSiswa.getRowPromise(name);
        res.write(JSON.stringify(result));
    } catch(err) {
        console.log('promise getRow error: '+err);
        res.write(err.toString());
    }
    //check status
    if(!status) {
        res.statusCode = 400;
        res.end();
        return;
    }
    console.log('Sukses menulis logs. ');
    res.end();
}

export async function listSiswa(req: IncomingMessage, res: ServerResponse){
    const url = parse(req.url, true);
    const query = url.query;

    //write logs
    const log = getTime()+'- User melihat list siswa.\n';
    const status = tulisLogs(log);
    if(!status) {
        res.statusCode = 400;
        res.end();
        return;
    }
    //get data from database
    try{
        const result = await dbSiswa.getRowsPromise();
        res.write(JSON.stringify(result));
    } catch(err) {
        console.log('promise getRow error: '+err);
        res.write(err.toString());
    }
    
    console.log('Sukses menulis logs.');
    res.end();
}

export async function addSiswa(req: IncomingMessage, res: ServerResponse){
    const url = parse(req.url, true);
    const query = url.query;

    //check data name
    if(!query['name'] || !query['classroom']){
        res.statusCode = 400;
        res.end();
        return;
    }
    //write logs
    const log = getTime()+`- User menambahkan siswa ${query['name']}.\n`;
    const status = tulisLogs(log);

    //post to database
    const data: Siswa = {name: query['name'].toString(), classroom: query['classroom'].toString()};
    try{
        const result = await dbSiswa.insertPromise(data);
        res.write(result);
    }catch(err){
        console.log('promise insert error: '+err);
        res.write(err.toString());
    }

    if(!status) {
        res.statusCode = 400;
        res.end();
        return;
    }
    console.log('Sukses menulis logs.');
    res.end();
}

export async function deleteSiswa(req: IncomingMessage, res: ServerResponse){
    const url = parse(req.url, true);
    const query = url.query;

    //check data name
    if(!query['name']){
        res.statusCode = 400;
        res.end();
        return;
    }
    //write logs
    const log = getTime()+`- User menghapus siswa ${query['name']}.\n`;
    const status = tulisLogs(log);
    if(!status) {
        res.statusCode = 400;
        res.end();
        return;
    }
    //delete from database
    try{
        const result = await dbSiswa.deletePromise(query['name'].toString());
        res.write(result);
    }catch(err){
        console.log('promise delete error: '+err);
        res.write(err.toString());
    }

    console.log('Sukses menulis logs.');
    res.end();
}

export async function updateSiswa(req: IncomingMessage, res: ServerResponse){
    const url = parse(req.url, true);
    const query = url.query;

    //check data name
    if(!query['name'] || !query['classroom']){
        res.statusCode = 400;
        res.end();
        return;
    }
    //write logs
    const log = getTime()+`- User mengubah kelas ${query['name']} menjadi ${query['classrom']}.\n`;
    const status = tulisLogs(log);
    if(!status) {
        res.statusCode = 400;
        res.end();
        return;
    }
    //post to database
    const data: Siswa = {name: query['name'].toString(), classroom: query['classroom'].toString()};
    try{
        const result = await dbSiswa.updatePromise(data);
        res.write(result);
    }catch(err){
        console.log('promise update error: '+err);
        res.write(err.toString());
    }

    console.log('Sukses menulis logs.');
    res.end();
}

export function viewLogs(req: IncomingMessage, res: ServerResponse){
    const url = parse(req.url, true);
    const query = url.query;
    console.log(query)

    const result = bacaLogs();
    if(!result.status) {
        res.statusCode = 400;
        res.end();
        return;
    }

    res.write(result.data);
    res.end();
}
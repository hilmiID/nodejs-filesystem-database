import { IncomingMessage, ServerResponse } from "http";
import { parse } from 'url';
import { tulisLogs, bacaLogs, getTime } from './file';

export function viewSiswa(req: IncomingMessage, res: ServerResponse){
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
    if(!status) {
        res.statusCode = 400;
        res.end();
        return;
    }
    console.log('Sukses menulis logs. ');
    res.end();
}

export function listSiswa(req: IncomingMessage, res: ServerResponse){
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
    console.log('Sukses menulis logs.');
    res.end();
}

export function addSiswa(req: IncomingMessage, res: ServerResponse){
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
    if(!status) {
        res.statusCode = 400;
        res.end();
        return;
    }
    console.log('Sukses menulis logs.');
    res.end();
}

export function deleteSiswa(req: IncomingMessage, res: ServerResponse){
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
    console.log('Sukses menulis logs.');
    res.end();
}

export function editSiswa(req: IncomingMessage, res: ServerResponse){
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
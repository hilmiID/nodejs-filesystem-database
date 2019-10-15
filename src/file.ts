import { writeFileSync, readFileSync } from 'fs'

const filename = './assets/logs.txt';

interface ReturnRead {
    status: boolean;
    data: string;
}

export function tulisLogs(data: string | string[]): Boolean {
    try{
        writeFileSync(filename, data, {flag:'a'});
        return true;
    } catch(err){
        console.log('Error saat menulis: '+err);
        return false;
    }
}

export function bacaLogs(): ReturnRead {
    try{
        const bacaan = readFileSync(filename);
        return {'status': true, 'data':bacaan.toString()};
    } catch (err){
        console.log(`Error saat membaca: ${err}`);
        return {'status': false, 'data':null};
    }
}

export function getTime(): String{
    var a = new Date(Date.now());
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = a.getMonth()+1;
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + '-' + month + '-' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}

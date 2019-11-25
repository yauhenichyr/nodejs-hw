import * as fs from 'fs';
import csvtojson from 'csvtojson/v2';

const filePath = './csv/data.csv';

fs.access(filePath, fs.F_OK, err => {
    if (err) {
        console.error(err)
        return
    }

    let readStream = fs.createReadStream(filePath);
    let writeStream = fs.createWriteStream('./result.txt');

    readStream.on('error', err => {
        console.log(err);
    });

    writeStream.on('error', err => {
        console.log(err);
    });

    writeStream.on('finish', () => {
        console.log('done');
    });

    function csv() {
        return csvtojson().preFileLine((fileLine, i) => {
            if (i === 0) return fileLine.toLowerCase();
            return fileLine;
        }).subscribe(jsonObj => {
            delete jsonObj.amount;
            jsonObj.price = parseFloat(jsonObj.price);
        });
    }

    readStream.pipe(csv()).pipe(writeStream);
});
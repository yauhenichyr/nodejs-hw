import * as fs from 'fs';
import csvtojson from 'csvtojson/v2';

const filePath = './task1/attachments/csv/data.csv';

class Convert {
    run = path => {
        if (!path) {
            console.log('Path not found');
            return;
        }

    }

    checkFile = path => {
        let ok = false;
        fs.access(path, fs.F_OK, err => {
            if (err) {
                console.error(err)
                return;
            }
            ok = true;
        })
        return ok;
    }
}

fs.access(filePath, fs.F_OK, err => {
    if (err) {
        console.error(err)
        return
    }

    let readStream = fs.createReadStream(filePath);
    let writeStream = fs.createWriteStream('./task1/result.txt');

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
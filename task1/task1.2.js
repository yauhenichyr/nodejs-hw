import * as fs from 'fs';
import csvtojson from 'csvtojson/v2';

const filePath = './task1/attachments/csv/data.csv';

class Convert {
    run = async path => {
        if (!path) {
            console.log('Path not found');
            return;
        }

        let fileOK = await this.checkFile(path);

        if (fileOK) {
            let readStream = fs.createReadStream(path);
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

            readStream.pipe(this.csv()).pipe(writeStream);
        }
    }

    csv = () => {
        return csvtojson().preFileLine((fileLine, i) => {
            if (i === 0) return fileLine.toLowerCase();
            return fileLine;
        }).subscribe(jsonObj => {
            delete jsonObj.amount;
            jsonObj.price = parseFloat(jsonObj.price);
        });
    }

    checkFile = async path => {
        return await new Promise(res => {
            fs.access(path, fs.F_OK, err => {
                if (err) {
                    throw new Error(err);
                }
                res(true);
            })
        }).catch(e => {return false});
    }
}

let convert = new Convert;
convert.run(filePath);
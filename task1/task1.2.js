import * as fs from 'fs';
import * as util from 'util';
import csvtojson from 'csvtojson/v2';

const FSaccess = util.promisify(fs.access);

const filePath = './task1/attachments/csv/data1.csv';

class Convert {
    run = async path => {
        if (!path) {
            console.log('Path not found');
            return;
        }

        let isPathAllowed = await this.checkFile(path);

        if (isPathAllowed) {
            const readStream = fs.createReadStream(path);
            const writeStream = fs.createWriteStream('./task1/result.txt');

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

    checkFile = path => {
        return FSaccess(path)
            .then(() => {return true})
            .catch(e => {
                console.log(e);
                return false
            });
    }
}

let convert = new Convert();
convert.run(filePath);
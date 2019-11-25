
let stdin = process.openStdin();

stdin.addListener('data', function(data) {
    process.stdout.write(`${data.toString().trim().split('').reverse().join('')}\n`);
});
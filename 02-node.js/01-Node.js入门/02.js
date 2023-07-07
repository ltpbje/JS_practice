const fs = require('fs');
fs.writeFile('./text.txt', 'Hello Node.js', err => {
    if (err) console.log(err);
    else console.log('写入成功');
})
fs.readFile('./text.txt', (err, data) => {
    if (err) console.log(err);
    else console.log(data.toString());
});
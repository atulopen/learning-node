const fs = require('fs')
const parse = require('csv-parse');

const results = [];

const fileReader = fs.createReadStream('./data/kepler_data.csv').pipe(parse({
    comment: "#",
    columns: true
}))

fileReader.on('data', (data) => {
    results.push(data);
})

fileReader.on('error', (err) => {
    console.log(err);
})

fileReader.on('end', () => {
    console.log(results);
})
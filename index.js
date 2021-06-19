const fs = require('fs')
const parse = require('csv-parse');

const habitablePlanet = [];

const isHabitable = (planet) => {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

const fileReader = fs.createReadStream('./data/kepler_data.csv').pipe(parse({
    comment: "#",
    columns: true
}))

fileReader.on('data', (data) => {
    if (isHabitable(data)) {
        habitablePlanet.push(data);
    }
})

fileReader.on('error', (err) => {
    console.log(err);
})

fileReader.on('end', () => {
    console.log(`${habitablePlanet.length} habitable planets found!`);
})
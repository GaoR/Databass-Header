const fs = require('fs');
const path = require('path')
const cityList = require('../cityList.json');

const headers = "CityID,cityName";

var stream = fs.createWriteStream(path.join(__dirname, '/CSV-data', 'cities.csv'));
stream.write(headers + '\n');

for (let i = 1; i <= 100; i += 1) {
  stream.write(`${i},${cityList[i]}` + '\n');
}

stream.end();

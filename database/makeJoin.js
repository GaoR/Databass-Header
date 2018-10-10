const fs = require('fs');
const path = require('path');
const cityList = require('../cityList.json');

const randomNumber = (max, min = 0) => Math.ceil(Math.random() * max) + min;

const headers = "JoinID,ArtistID,CityID,Followers";

const endPromise = (stream) => new Promise ((resolve, reject) => {
  stream.end(resolve);
});

const generateData = async () => {
  let tracker = 0;
  for (let i = 1; i <= 10; i++) {
    var stream = fs.createWriteStream(path.join(__dirname, "/CSV-data", `join-${i}.csv`));
    stream.write(headers + "\n");
    let count = tracker * 5 + 1;

    for (let j = 1; j <= 1000000; j++) {
      for (let k = 0; k < 5; k++) {
        let city = `${count},${tracker+j},${randomNumber(100,1)},${randomNumber(100000,1)}`;
        count++;
        stream.write(city + "\n");
      }
    }
    await endPromise(stream);
    tracker += 1000000;
    console.log(tracker);
  }
  console.log('Done!');
}

generateData();
const faker = require('faker');
const fs = require('fs');
const path = require('path');

const headers = "ArtistID,Name,Bio,Followed,Verified,Followers,Images,Cities";

const randomNumber = (max, min = 0) => Math.floor(Math.random() * (min - max + 1)) + max;

const addImages = () => {
  const images = [];
  for (let i = 0; i < 3; i++) {
    images.push(`""https://s3-us-west-1.amazonaws.com/header-pics/${randomNumber(999)}.jpg""`);
  }

  return ('"[' + images + ']"');
}

const endPromise = (stream) => new Promise ((resolve, reject) => {
  stream.end(resolve);
});

const generateData = () => {
  let tracker = 1;
  for (let i = 1; i <= 10; i += 1) {
    var stream = fs.createWriteStream(path.join(__dirname, "/CSV-data", `artistss-${i}.csv`));
    stream.write(headers + "\n");
    
    for (let j = 0; j < 1000000; j += 1) {
      let artist = `${tracker + j},${faker.name.findName()},${faker.lorem.paragraph()},false,${Math.round(Math.random()) ? true : false},${randomNumber(1000000, 10)},${addImages()}`;

      stream.write(artist + "\n");
    }
    await endPromise(stream);
    tracker += 1000000;
    console.log(tracker);
  }
  console.log('Done!');
};

generateData();
const cityList = require('../cityList.json');
const faker = require('faker');
const fs = require('fs');
const path = require('path');


const randomNumber = (max, min = 0) => Math.ceil(Math.random() * max) + min;

const createCities = (n = 100) => {
  const cities = [];

  for (let i = 0; i < n; i += 1) {
    cities.push(faker.address.city())
  }
  return cities;
}

const createImages = (n = 1000) => {
  const images = [];

  for (let i = 0; i < n; i += 1) {
    images.push(`https://s3-us-west-1.amazonaws.com/header-pics/${randomNumber(1000,1)}.img`)
  }
  return images;
}

class Artists {
  constructor(props) {
    this.name = faker.name.findName();
    this.followed = Math.round(Math.random()) ? true : false,
    this.followers = 'PLACE_HOLDER',
    this.verified = Math.round(Math.random() * 0.7 + 0.3) ? true : false,
    this.bio = faker.lorem.paragraphs(randomNumber(4, 2), '\n\n'),
    this.photos = [],
    this.cities = {}
  };

  addCities(cities) {
    for (let i = 0; i < 5; i += 1) {
      this.cities[cities[randomNumber(99)]] = randomNumber(100000, 1000)
    }
  };

  addPhotos() {
    for (let i = 0; i < 3; i += 1) {
      this.photos.push(`https://s3-us-west-1.amazonaws.com/header-pics/${randomNumber(1000,1)}.img`)
    }
  };

  addFollowers() {
    let sum = 0;
    const cities = this.cities;
    for (let city in cities) {
      sum = sum + cities[city];
    }
    this.followers = sum * 20;
  };
}

const createArtist = (num = 1, index = 0) => {
  let artists = [];
  for (let i = 0; i < num; i += 1) {
    let artist = new Artists();
    artist.ID = index + i;
    artist.addCities(cityList);
    artist.addPhotos();
    artist.addFollowers();
    artists.push(artist);
  }
  return artists;
}

const writeFile = (stream, json) => {
  stream.write(json, 'utf-8', () => {
    stream.end();
  })
};

 const generatorLooper = async () => {
  let tracker = 0;
  for (let i = 10; i < 100; i += 1) {
    let artists = createArtist(100000, tracker);
    let stream = fs.createWriteStream(path.join(__dirname, 'JSON-data', `data-${i}.json`));
    let json = JSON.stringify(artists, null, 2);
    await writeFile(stream, json);
    tracker += 100000;
    console.log(tracker);

  }
}

 generatorLooper(); 

//  const writeFile = (stream, json) => new Promise ((resolve, reject) => {
//   stream.write(json, 'utf-8', () => {
//     stream.end(resolve);
//   })
// });
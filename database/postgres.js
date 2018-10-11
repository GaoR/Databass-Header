const { Pool, Client } = require('pg');
const path = require('path');

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'Spotify',
//   password: 'ar1550',
//   port: 5432,
// });

const pool = new Pool({
  user: 'power_user',
  host: '13.57.197.123',
  database: 'postgres',
  password: '$ar1550',
  port: 5432,
});

const postFind = (id, callback) => {
  pool.connect((err, client, done) => {
    if (err) throw err;
    client.query(`SELECT artistname, bio, followed, verified, images, city, artists_cities.followers
    FROM artists_cities
    INNER JOIN artists ON artists.artistID = artists_cities.artistID
    INNER JOIN cities ON cities.cityID = artists_cities.cityID
    WHERE artists.artistID = ${id};`, (err, res) => {
      done();
  
      if (err) {
        callback(err.stack, null);
      } else {
        const result = {};
        result.artistName = res.rows[0].artistname;
        result.bio = res.rows[0].bio;
        result.followersNumber = res.rows[0].followers;
        result.verified = res.rows[0].verified;
        result.followed = res.rows[0].followed;
        result.artistImages = res.rows[0].images;
        result.cities = {};
        for (let i = 0; i < 5; i++) {
          result.cities[res.rows[i].city] = res.rows[i].followers;
        };

        console.log(result);
  
        callback(null, [result]);
        // callback(null, res.rows);
      }
    })
  })
};

module.exports = postFind;

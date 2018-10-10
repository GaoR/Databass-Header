CREATE TABLE artists(
 artistID INTEGER PRIMARY KEY,
 artistName VARCHAR,
 bio VARCHAR,
 followed BOOLEAN,
 verified BOOLEAN,
 followers INTEGER,
 images JSON
);

CREATE TABLE artists_cities(
 joinID INTEGER PRIMARY KEY,
 artistID INTEGER,
 cityID INTEGER,
 followers INTEGER
);

CREATE TABLE cities(
 cityID INTEGER PRIMARY KEY,
 city VARCHAR
);

ALTER TABLE artists_cities
ADD CONSTRAINT artist
FOREIGN KEY (cityid) REFERENCES public.cities(cityid)
ON UPDATE CASCADE;

ALTER TABLE artists_cities
ADD CONSTRAINT city
FOREIGN KEY (artistid) REFERENCES public.artists(artistid) 
ON UPDATE CASCADE;

CREATE INDEX artists_idx ON artists_cities (artistid);

SELECT pg_size_pretty(pg_database_size('postgres'));

vol-044d2d7f61c6223f8

SELECT
 artists.artistName,
 cities.city,
 artists_cities.followers
FROM
 artists, cities, artists_cities
WHERE
 artists.artistID = artists_cities.artistID 
AND
 cities.cityID = artists_cities.cityID
AND artists.artistID = 9000000;

SELECT city, artists_cities.followers
FROM artists_cities
INNER JOIN artists ON artists.artistID = artists_cities.artistID
INNER JOIN cities ON cities.cityID = artists_cities.cityID
WHERE artists.artistID = 9000005;

SELECT artistName, city, artists_cities.followers
FROM artists_cities
LEFT JOIN artists on artists_cities.artistID = artists.artistID

SELECT artistName where artists.artistID = 9000005;

  artistID: {
    type: Number,
    unique: true
  },
  followed: Boolean,
  artistName: String,
  followersNumber: Number,
  artistImages: [String],
  about: {
    Biography: String,
    Where: Object
  }


// for (let i = 1; i <= 10; i++) {
//   pathway = path.join(__dirname, '/CSV-data', `join-${i}.csv`);
//   pool.query(
//     `COPY artists_cities FROM '${pathway}' DELIMITER ',' CSV HEADER`,
//     (res, err) => {
//       if (err) {
//         console.log(err);
//       }
//       console.log(res);
//     }
//   );
// }

netstat -ano | findstr :3004
taskkill /PID 16324 /F

ssh -i .\Databass.pem ec2-user@54.183.152.90 -v
scp -i .\Databass.pem c:\Users\gao10\Documents\hackReactor\SDC\Header\database\CSV-data\artists-1.csv ec2-user@54.183.152.90/home/CSVs
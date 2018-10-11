require('newrelic');
const express = require('express');
const path = require('path');
const postgres = require('../database/postgres.js');
  
const app = express();

app.get('/artists/:artistID', (req, res) => {
  const { artistID } = req.params;
  postgres(artistID, (err, data) => {
    if (err) {
      console.log(err)
      res.send(err);
    } else {
      res.send(data);
    }
  })
});


app.post('/artists/:artistID', (req, res) => {
  res.send('Posted!');
});

app.delete('/artists/:artistID', (req, res) => {
  console.log(req.body);
  res.send('Deleted!');
});

app.put('/artists/:artistID', (req, res) => {
  console.log(req.body);
  res.send('Updated!');
});

// app.get('/bundle.js', (req, res) => {
//   res.sendFile((path.resolve('public/dist/bundle.js')));
// });

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve('public/dist/index.html'));
// });

app.listen(process.env.PORT || 3004, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info(`==> Listening on port ${process.env.PORT || 3004}`);
});

module.exports = app;

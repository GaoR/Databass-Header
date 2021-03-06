// require('newrelic');

var cluster = require('cluster');

if (cluster.isMaster) {
    var cpuCount = require('os').cpus().length;
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }
    cluster.on('exit', function (worker) {
        console.log('Worker %d died :(', worker.id);
        cluster.fork();
    });

} else {
  const express = require('express');
  const postgres = require('../database/postgres.js');
    
  const app = express();
  // app.use(express.static(__dirname + '/../public/dist'))

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
  
  app.listen(process.env.PORT || 3004, function onStart(err) {
    if (err) {
      console.log(err);
    }
    console.info(`==> Listening on port ${process.env.PORT || 3004}`);
  });
  
  module.exports = app;
}

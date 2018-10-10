const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'spotify' });

const cassFind = (id, callback) => {
  const query = `SELECT * FROM test WHERE artistID = ?`;
  client.execute(query, [`${id}`], {prepare: true}, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
}

module.exports = cassFind;

// app.get('/cass/:artistID', (req, res) => {
//   const { artistID } = req.params;
//   cass(artistID, (err, data) => {
//     if (err) {
//       console.log(err);
//       res.send(err);
//     } else {
//       res.send(data.rows);
//     }
//   })
// })

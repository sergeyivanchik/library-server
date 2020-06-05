const connectionString = require('../configs/db').dbConnectionString;
const mongoose = require('mongoose');

const setUpConnection = () => {
  mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => mongoose.connection)
    .catch(error => console.log(error))
};

module.exports = {
  setUpConnection
}
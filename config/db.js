const mongoose = require('mongoose')

const connect = (url = process.env.DB_URL_LOCAL, opts = {}) => {
  mongoose.connect(url, {
    ...opts,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on('error', err => {
    console.log('err', err);
  });
  mongoose.connection.on('connected', (err, res) => {
    console.log('Connection establish');
  });
};

module.export = {
    connect
}

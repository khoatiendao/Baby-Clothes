const mongoose = require('mongoose');
const MyConstant = require('./MyConstant')
const urlDB = 'mongodb+srv://' + MyConstant.DB_USER + ':' + MyConstant.DB_PASSWORD + '@' + MyConstant.DB_SERVER
              + '/' + MyConstant.DB_DATABASE;
mongoose.connect(urlDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected to ' + MyConstant.DB_SERVER + '/' + MyConstant.DB_DATABASE);

}).catch((err) => {
    console.error('Connected failed' + err);
});

// const mongoose = require('mongoose');

// const url = 'mongodb+srv://kevinbrunoktd159:khoa123456789@clusterkidscollection.ubmiwms.mongodb.net/Kids-Collections';

// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'Connection error:'));
// db.once('open', function() {
//   console.log('Database connected');
// });
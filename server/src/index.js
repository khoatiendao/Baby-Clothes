import express from 'express';
import bodyParser from 'body-parser';
import mongooseConn from './common/config/mongoose.js';
import AdminRoute from './route/admin/index.js';

const app = express();
const PORT = process.env.PORT || 8433;

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.set('trust proxy', true);

app.listen(PORT, () => {
    console.log(`Server run ${PORT}`);
});

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, OPTIONS, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type,x-access-token");
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("optionsSucessStatus", 200)
    next()
});

app.use('/api/v1', AdminRoute);

// app.use('/api/customer', require('./api/customer.js'));

//Deployment
// const path = require('path');
// // '/admin' serve the files at client-admin/build/* as static files
// app.use('/admin', express.static(path.resolve(__dirname, '../../client-admin/build')));
// app.get('/admin/*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../../client-admin/build', 'index.html'))
// });
// app.get('/', (req, res) => {
//   res.send("Hello");
// });
// '/' serve the files at client-customer/build/* as static files
// app.use('/', express.static(path.resolve(__dirname, '../../client-customer/build')));
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../../client-customer/build', 'index.html'));
// });

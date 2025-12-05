import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongooseConn = 'mongodb+srv://' + process.env.DB_USERNAME + ':' + 
    process.env.DB_PASSWORD + '@' + process.env.DB_SERVER + '/' + process.env.DB_DATABASE;
await mongoose.connect(mongooseConn, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected database');
}).catch((err) => {
    console.error('Connected failed' + err);
});

export default mongooseConn;
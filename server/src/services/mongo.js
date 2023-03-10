const mongoose = require('mongoose');

const LOCAL_MONGO_URL = process.env.LOCAL_MONGO_URL;
const ATLAS_MONGO_URL = process.env.ATLAS_MONGO_URL;

mongoose.connection.once('open', () => {
    console.log('MongoDB connection is ready.');
    console.log('mongo url', ATLAS_MONGO_URL);
});

mongoose.connection.on('error', (err) => {
    console.error(err);
});

mongoose.set('strictQuery', true);

async function mongoConnect(){
    await mongoose.connect(ATLAS_MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

async function mondoDisconnect(){
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mondoDisconnect
}
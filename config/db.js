const mongoose = require('mongoose');

const connectDB = async () => {
    const connection = await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });
}
// shortcut to mongoose.connection object
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.on('connected', function () {
    console.log(`Connected to database ${db.name} at ${db.host}:${db.port}`);
});

module.exports = connectDB
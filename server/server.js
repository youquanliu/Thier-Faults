const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');

require('dotenv').config({ path: './config/config.env' })

//User bodyparser
const app = express();

//connect to database
connectDB()

app.use(bodyParser.json())

if (process.env.NODE_ENV === 'development') {
    app.use(cors({
        origin: process.env.CLIENT_URL
    }))

    app.use(morgan('dev'))
    //Morgan give information about each request
    //Cors allow to deal with react for localhost at port 3000 without any problem
}
//load all routes
const authRouter = require('./routes/auth.route')

//use routers
app.use('/api/', authRouter);

app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Page not founded"
    })
});

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})
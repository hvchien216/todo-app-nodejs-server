const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 4000;
const urlencodedParser = bodyParser.urlencoded({ extended: false })

//Import Routes
const authRoute = require('./routes/auth.route');
const todoRoute = require('./routes/todo.route');

// Middlewares
app.use(cors());
app.use(urlencodedParser);
app.use(bodyParser.json());

//connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: false,
        useFindAndModify: false
    },
    () => console.log('connected to DB...')
)

//Route
app.use('/api/user', authRoute);
app.use('/api/todo', todoRoute);


app.listen(PORT, () => console.log(`Server is running in ${PORT}`))
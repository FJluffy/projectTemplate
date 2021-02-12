const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/images', express.static('images'));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

const detailsRouter = require('./routes/details');
const accountsRouter = require('./routes/accounts');
const usersRouter = require('./routes/users');
const subscribeRouter = require('./routes/subscribes')
const commentRouter = require('./routes/comments')
//const user = require('./models/user.model');

//const userInput = {
//    username: "Jay",
//    password: "cisco1234",
//    role:"admin"
//}

//const User = new user(userInput);
//User.save((err, document) => {
//    if (err)
//        console.log(err);
//    console.log(document);
//})




app.use('/details', detailsRouter);
app.use('/accounts', accountsRouter);
app.use('/users', usersRouter);
app.use('/subscribes', subscribeRouter);
app.use('/comments', commentRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
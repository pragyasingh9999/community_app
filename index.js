const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 8000;

const roleRouter = require('./router/roleRouter');
const authRouter = require('./router/authRouter');
const communityRouter = require('./router/communityRouter');
const memberRouter = require('./router/memberRouter');
const { restrictToLoggedInUserOnly } = require("./middleware/auth.js");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/v1/auth', authRouter);
app.use('/v1/role', restrictToLoggedInUserOnly, roleRouter);
app.use('/v1/community', restrictToLoggedInUserOnly, communityRouter);
app.use('/v1/member', restrictToLoggedInUserOnly, memberRouter);


app.listen(PORT, () => {
    console.log(`App started on Port: ${PORT}`);
});
const express = require('express');
const app = express();
const connectdb = require('./config/connectdb');

//====================CORS config Start==========================
const cors = require('cors');
app.use(cors());
app.use(express.json());

//====================Google Auto Auth routes Start========================
const session = require('express-session');
const passport = require('passport');

require('./utils/googleAutoAuthConfig');

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);


app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
          successRedirect: '/protected',
          failureRedirect: '/auth/google/failure'
        })
);
const {User} = require('./models/auth/user');
app.get('/protected', isLoggedIn, async(req, res) => {
     const user = new User({
       fullname:req.user.displayName
     });
    const result = await user.save();
    res.send(result);
});

app.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('Goodbye!');
});

app.get('/auth/google/failure', (req, res) => {
    res.send('Failed to authenticate..');
});

//====================Client routes Start========================
const surfaceRoute = require('./routes/client/surface');
const authRoute = require('./routes/client/auth');
app.use('/api/v1', surfaceRoute);
app.use('/api/v1', authRoute);

//====================Need Auth routes Start======================
const orderRoute = require('./routes/needAuth/order');
const accountRoute = require('./routes/needAuth/account');
app.use('/api/v1', orderRoute);
app.use('/api/v1/account', accountRoute);

//====================Admin routes Start==========================
const productRoute = require('./routes/admin/product');
const categoryRoute = require('./routes/admin/category');
const userRoute = require('./routes/admin/user');

const adminApiUrl = '/api/v1/ad';
app.use(`${adminApiUrl}/category`, categoryRoute);
app.use(`${adminApiUrl}/product`, productRoute);
app.use(`${adminApiUrl}/user`, userRoute);

//====================App Starter Start======================
app.use('/', (req, res) => {
  res.status(200).send('App Start');
});

connectdb();

app.listen(3000, () => {
  console.log('Server on port 3000 running...');
});

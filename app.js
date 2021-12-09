const express = require('express'); // express를 쓴다
const cookieParser = require('cookie-parser');
const path = require('path');
// const session = require("express-session");
const dotenv = require('dotenv');
const { sequelize } = require('./models');
// const passport = require("passport");

dotenv.config();

const app = express();
// passportConfig();
app.set('port', process.env.PORT || 3000);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser(process.env.COOKIE_SECRET));
// app.use(
//   session({
//     resave: false,
//     saveUninitialized: false,
//     secret: process.env.COOKIE_SECRET,
//     cookie: {
//       httpOnly: true,
//       secure: false,
//     },
//   })
// );
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
// app.use(passport.initialize());
// app.use(passport.session());

// app.use('/', pageRouter);

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// const cors = require("cors");

// app.use(cors({ origin: true, credentials: true })); //cors option

// const Router = require("./routers");
// const UserRouter = require("./routers/user");

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

const Router = require('./routers');
app.use([Router]);
Router.get('/', (request, res) => {
  res.render('index');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});

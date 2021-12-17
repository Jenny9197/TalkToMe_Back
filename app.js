const express = require('express'); // express를 쓴다
const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const { sequelize } = require('./models');
const passport = require('passport');
const passportConfig = require('./passport');
const requestIp = require('request-ip');

dotenv.config();

const app = express();
passportConfig();
app.set('port', process.env.PORT || 3000);

const cookieParser = require('cookie-parser');
app.use(cookieParser(process.env.COOKIE_SECRET));

const cors = require('cors');
let colsOptions = {
  origin: [
    'http://localhost:3000', // 접근 권한을 부여하는 도메
    // 'http://fungap.shop',
    'https://localhost:3000',
    // 'https://fungap.shop',
  ],
  credentials: true,
  // exposedHeaders: [Set - Cookie],
  methods: ['POST', 'PUT', 'GET', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
  optionsSuccessStatus: 200,
};
app.use(cors(colsOptions));

app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

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
app.use(passport.initialize());
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
const options = {
  // letsencrypt로 받은 인증서 경로를 입력
  ca: fs.readFileSync(process.env.SECRET_HTTPS_CA),
  key: fs.readFileSync(process.env.SECRET_HTTPS_KEY),
  cert: fs.readFileSync(process.env.SECRET_HTTPS_CERT),
};
http.createServer(app).listen(3000);
https.createServer(options, app).listen(443);

// app.listen(app.get('port'), () => {
//   console.log(app.get('port'), '번 포트에서 대기 중');
// });

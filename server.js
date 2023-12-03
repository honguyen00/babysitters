const express = require('express');
const session = require('express-session');

const routes = require('./controllers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const moment = require('moment');

// handlebars dependencies
const exphbs = require('express-handlebars');
const path = require('path');
const hbs = exphbs.create({
  defaultLayout: 'main',
  helpers: {
    is_eq: function(value1, value2) {
      return value1 == value2;
    },
    formatDate: function(date) {
      return moment(date).format('DD MMM'); // Formats the date to "22 MAR"
    }
  }
});

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'mysecretstring',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set Handlebars as the default template engine.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//     res.render('home', { layout: 'main', title: 'Home' });
// });

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

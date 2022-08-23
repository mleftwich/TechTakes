// IMPORT PACKAGES
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

// SET UP CONNECTION
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// CREATE HANDLEBARS INCLUDE HELPERS
const hbs = exphbs.create({ helpers });


// SET UP SESSION
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// TELL EXPRESS TO USE HB TEMPLATES
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// USE PUBLIC FOLDER AND DEFINE ROUTE PATH
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

// START SERVER
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening at http://localhost:' + PORT));
});

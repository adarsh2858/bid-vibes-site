// import helmet for securing app from xss attacks

// import express-rate-limit to prevent DoS attacks where repeated requests flood the server

// import body-parser middleware which looks at requests where content-type of header matches

// import 'dotenv/config';
// import cors from 'cors';

const express = require('express');
const formData = require('express-form-data');
const cloudinary = require('cloudinary');
const app = express();
const { PORT = 3000 } = process.env;
const path = require('path');
// const flash = require('connect-flash');
// const session = require('express-session');

const axios = require('axios');
const http = require('http');
const reload = require('reload');

let userCount,
  promiseObject = {};

// get the mysql service
const mysql = require('mysql');

// add the credentials to access your database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: null,
  database: 'employee',
  multipleStatements: true,
});

exports.connection = connection;

const jwtAuthentication = require('./jwt-authentication');

// connect to mysql
connection.connect(function (err) {
  // in case of error
  if (err) {
    console.log(err.code);
    console.log(err.fatal);
  }
});

cloudinary.config({
  cloud_name: 'dj2xpmtn5',
  api_key: '541919797753448',
  api_secret: 'DrbaMbi5MbaF0mF3axbspgXb35U',
});

// app.use(express.cookieParser('keyboard cat'));
// app.use(
//   session({
//     secret: 'adarsh',
//     saveUninitialized: true,
//     resave: true,
//   })
// );
// app.use(flash());
app.use(formData.parse());
app.use(express.static('client/public'));

// middleware to parse body for fetching form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());

app.use((req, res, next) => {
  Promise.resolve(promiseObject)
    .then(({ accessToken }) => {
      // if (accessToken) res.setHeader('Access-Token', accessToken);
      if (req) jwtAuthentication.setAccessToken(accessToken);
    })
    .catch((err) => {
      console.error(err);
    });

  next();
});
app.use(jwtAuthentication.jwtAuthenticationMiddleware);
// Use the following to have user_id without calling isAuthenticatedMiddleware on the routes
// app.use((req, res, next) => {
//   res.locals.user_id = req.user_id;
//   next();
// });

app.set('views', path.join('client/public'));
app.set('view engine', 'ejs');

exports.app = app;
exports.isAuthenticatedMiddleware = jwtAuthentication.isAuthenticatedMiddleware;
require('../controllers/comments');

app.post('/jwt-login', jwtAuthentication.jwtLogin);

app.get('/', (req, res) => {
  res.sendFile('app.html', { root: 'client/public' });
});

app.get('/products', (req, res) => {
  res.sendFile('all_products.html', { root: 'client/public' });
});

app.get('/user-logged-in', (req, res) => {
  res.json({ loggedIn: jwtAuthentication.isUserAuthenticated(req) });
});

app.get('/all-products', (req, res) => {
  try {
    connection.query(
      `create table if not exists products (id INT(6) unsigned auto_increment primary key,
        name varchar(20) not null, description varchar(30) not null, image text); 
        SELECT * FROM products;`,
      function (err, rows) {
        if (err) {
          console.error(err);
          // throw err;
        } else {
          res.send(rows[1]);
        }
      }
    );
  } catch (error) {
    console.log(error);
    return;
  }
});

app.get(
  `/product/new`,
  jwtAuthentication.isAuthenticatedMiddleware,
  (req, res) => {
    res.sendFile('new_product.html', { root: 'client/public' });
  }
);

app.post(
  '/product/new',
  jwtAuthentication.isAuthenticatedMiddleware,
  (req, res) => {
    //perform a query
    $query = `insert into products (name, description, image, user_id) 
      values ('${req.body.name}','${req.body.description}', 
        '${req.body.image}', '${res.locals.user_id}')`;

    connection.query($query, function (err, rows, fields) {
      if (err) {
        console.log('An error occurred performing the query.');
        return res.redirect('/products/new');
      }

      return res.redirect('/products');
    });
  }
);

app.get(
  '/product/:id/edit',
  jwtAuthentication.isAuthenticatedMiddleware,
  (req, res) => {
    connection.query(
      'SELECT user_id FROM products WHERE id = ?',
      [req.params.id],
      (error, results, fields) => {
        if (error) console.log('ERROR while editing - ' + error);
        if (res.locals.user_id == results[0].user_id)
          res.sendFile('edit_product.html', { root: 'client/public' });
        else {
          res.status(401);
          res.json({ error: 'Unauthorized Access.' });
        }
      }
    );
  }
);

app.get(
  '/product/:id/editInfo',
  jwtAuthentication.isAuthenticatedMiddleware,
  (req, res) => {
    connection.query(
      'SELECT * FROM products WHERE id = ?',
      [req.params.id],
      (error, results, fields) => {
        if (error) console.log('ERROR while editing - ' + error);
        res.send(results[0]);
      }
    );
  }
);

app.post(
  '/product/:id/edit',
  jwtAuthentication.isAuthenticatedMiddleware,
  (req, res) => {
    $query = `UPDATE products SET name = '${req.body.name}', 
    description = '${req.body.description}',
    image = '${req.body.image}' WHERE ID = '${req.params.id}'`;

    connection.query($query, (err) => {
      if (err) {
        console.log('ERROR while editing - ' + err);
      }
    });
    return res.redirect('/products');
  }
);

app.post('/image-upload', (req, res) => {
  cloudinary.uploader.upload(req.files.myFile.path).then((image) => {
    res.send(image);
  });
});

app.get(
  '/product/:id/delete',
  jwtAuthentication.isAuthenticatedMiddleware,
  (req, res) => {
    $query = `DELETE FROM products WHERE ID = ${req.params.id} AND USER_ID = ${res.locals.user_id}`;

    connection.query($query, (err, results) => {
      if (err) {
        console.log('ERROR while deleting - ' + err);
      }
      console.log(results);
      if (results.affectedRows == 0)
        res.json({ error: 'Unauthorized access.' });
      else res.redirect('/products');
    });
  }
);

app.get('/product/:id/show', (req, res) => {
  if (req.header('accept') == 'application/json')
    return res.json({ productId: req.params.id });

  connection.query(
    'SELECT * FROM products WHERE id = ?',
    [req.params.id],
    (error, results, fields) => {
      if (error) console.log('ERROR while editing - ' + error);
      res.render('show_product', {
        product: results[0],
      });
    }
  );
});

app.get('/users', (req, res) => {
  axios.get('https://randomuser.me/api/?page=1&results=10').then((response) => {
    res.send(response.data);
  });
});

app.get('/all-users', (req, res) => {
  $query = `SELECT * FROM users`;

  if (req.header('accept') != 'application/json')
    return res.sendFile('all_users.html', { root: 'client/public' });

  connection.query($query, (err, rows) => {
    if (err) {
      console.error(err);
    } else {
      res.send(rows);
    }
  });
});

app.get('/register', (req, res) => {
  $query = `SELECT COUNT(*) AS total FROM users`;

  connection.query($query, function (err, rows, fields) {
    if (err) {
      console.log('An error occurred  performing the query.');
      return;
    }

    console.log('Query successfully executed: ', rows[0].total);
    userCount = rows[0].total;
  });

  res.sendFile('register.html', { root: 'client/public' });
});

app.post('/register', (req, res) => {
  //perform a query
  $query = `INSERT INTO users values (${userCount + 1},20,'${
    req.body.username
  }','${req.body.password}')`;

  connection.query($query, function (err, rows, fields) {
    if (err) {
      console.log('An error occurred performing the query.');
      return res.redirect('/register');
    }

    console.log('Query successfully executed: ', rows);

    promiseObject = jwtAuthentication.jwtLogin(req, res);

    Promise.resolve(promiseObject).then(({ success }) => {
      if (success) res.redirect('/products');
      else res.redirect('/register');
    });
  });
});

app.get('/login', (req, res) => {
  res.sendFile('login.html', { root: 'client/public' });
});

app.post('/login', (req, res) => {
  promiseObject = jwtAuthentication.jwtLogin(req, res);

  Promise.resolve(promiseObject).then(({ success }) => {
    if (success) {
      res.json({ message: 'Logged In Successfully.', redirectTo: '/products' });
      // res.redirect('/products');
    } else {
      res.json({ message: 'Invalid credentials', redirectTo: '/login' });
      // res.redirect('/login');
    }
  });
});

app.get('/redux', (req, res) => {
  res.sendFile('redux.html', { root: 'client/public' });
});

app.get(
  '/check-user-authorization',
  jwtAuthentication.isAuthenticatedMiddleware,
  (req, res) => {
    res.json({ userId: res.locals.user_id });
  }
);

app.get('/close', jwtAuthentication.isAuthenticatedMiddleware, (req, res) => {
  // Close the connection with database
  connection.end(function () {
    // the connection has been closed
  });
  return res.redirect('/products');
});

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
reload(app)

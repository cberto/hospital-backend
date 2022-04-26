require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

//server express

const app = express();

app.use(cors());

//parseo body

app.use(express.json());

dbConnection();

app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/auth'));

// app.get('/api/users');

app.listen(process.env.PORT, () => {
  console.log('El servidor esta corriendo en el puerto ' + process.env.PORT);
});

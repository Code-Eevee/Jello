const express = require('express');
const path = require('path');
const dataRouter = require('./Routes/dataRouter');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/data', dataRouter);

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../index.html'));
});
app.get('/calendar', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../index.html'));
});
app.get('/signUp', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../index.html'));
});
app.get('/signOut', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../index.html'));
});
app.get('/home', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.use('/build', express.static(path.join(__dirname, '../build/bundle.js')));

//404 error
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

//global error handler
app.use((err, req, res, next) => {
  res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => console.log(`Server listening to port: `, PORT));

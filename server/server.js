const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// app.get('/', (req, res) => {
//   res.status(200).sendFile(path.join(__dirname, '../index.html'));
// });

app.get('/', (req, res) => {
  res.status(200).send('hello');
});
app.listen(PORT, () => console.log(`Server listening to port 3000`));

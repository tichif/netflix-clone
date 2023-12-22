const express = require('express');
const cors = require('cors');

const movies = require('./movies.json');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/movies/list', (req, res) => {
  return res.send(movies);
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

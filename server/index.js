const express = require('express');
const cors = require('cors');

const movies = require('./movies.json');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/movies/list', (req, res) => {
  return res.send(movies);
});

app.get('/movie/:id', (req, res) => {
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === id);

  return res.send(movie);
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

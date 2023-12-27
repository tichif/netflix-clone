const express = require('express');
const cors = require('cors');

const movies = require('./movies.json');
const prisma = require('./db');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/movies/list', async (req, res) => {
  const offset = parseInt(req.query.offset);

  const movies = await prisma.movie.findMany({
    skip: offset,
    take: 12,
  });
  const count = await prisma.movie.count();
  return res.json({ movies, count });
});

app.get('/movie/:id', async (req, res) => {
  const { id } = req.params;
  const movie = await prisma.movie.findUnique({
    where: {
      id: +id,
    },
  });

  return res.send(movie);
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

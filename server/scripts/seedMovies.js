const movies = require('../movies.json');
const prisma = require('../db');

const seedMovies = async () => {
  await prisma.movie.deleteMany();

  const movieFormatted = movies.map(
    ({ title, description, thumbnailUrl, videoUrl, genre, duration }) => {
      return {
        title,
        description,
        thumbnailUrl,
        videoUrl,
        genre,
        duration,
      };
    }
  );

  await prisma.movie.createMany({ data: movieFormatted });
};

seedMovies();

import MovieCard from './MovieCard';
import type { Movie } from '../types';

const MovieList = ({ movies }: { movies: Movie[] }) => {
  return (
    <div className='px-12 mt-4 space-y-8'>
      <div>
        <p className='text-black font-semibold p-4 text-2xl'>Popular Shows</p>
        <div className='flex flex-wrap gap-2 justify-between'>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;

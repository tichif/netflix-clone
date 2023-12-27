import MovieCard from './MovieCard';
import type { Movie } from '../types';

const MovieList = ({
  movies,
  lastElementRef,
}: {
  movies: Movie[];
  lastElementRef: (node: HTMLDivElement) => void;
}) => {
  return (
    <div className='px-12 mt-4 space-y-8'>
      <div>
        <p className='text-black font-semibold p-4 text-2xl'>Popular Shows</p>
        <div className='flex flex-wrap gap-2 justify-between'>
          {movies.map((movie, index) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              lastElementRef={
                movies.length === index + 1 ? lastElementRef : null
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;

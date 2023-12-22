import MovieCard from './MovieCard';

const MovieList = () => {
  return (
    <div className='px-12 mt-4 space-y-8'>
      <div>
        <p className='text-black font-semibold p-4 text-2xl'>Popular Shows</p>
        <div className='grid grid-cols gap-2'>
          <MovieCard />
        </div>
      </div>
    </div>
  );
};

export default MovieList;

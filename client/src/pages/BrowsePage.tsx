import Billboard from '../components/Billboard';
import MovieList from '../components/MovieList';
import Navbar from '../components/Navbar';
import useMoviesList from '../hooks/useMoviesList';

const BrowsePage = () => {
  const { data, error, loading } = useMoviesList();

  return (
    <div>
      <Navbar />
      <Billboard />
      <div className='pb-5'>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {data && <MovieList movies={data} />}
      </div>
    </div>
  );
};

export default BrowsePage;

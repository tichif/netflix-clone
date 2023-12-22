import { useParams, useNavigate } from 'react-router-dom';

import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import useMovie from '../hooks/useMovie';

const WatchPage = () => {
  const params = useParams() as { id: string };
  const navigate = useNavigate();

  const { data, error, loading } = useMovie(params.id);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || !data) {
    return <p>{error}</p>;
  }

  return (
    <div className='h-screen w-screen bg-black'>
      <nav className='fixed w-full z-10 flex items-center gap-8 p-4 bg-black bg-opacity-80'>
        <ArrowLeftIcon
          className='w-10 text-white cursor-pointer hover:opacity-80 transition'
          onClick={() => navigate('/browse')}
        />
        <p className='text-white text-3xl font-bold'>
          <span className='font-light'>Watching:</span> {data.title}
        </p>
      </nav>
      <iframe
        src={data.videoUrl}
        className='h-full w-full'
        allowFullScreen
        allow='autoplay'
      ></iframe>
    </div>
  );
};

export default WatchPage;

import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const WatchPage = () => {
  return (
    <div className='h-screen w-screen bg-black'>
      <nav className='fixed w-full z-10 flex items-center gap-8 p-4 bg-black bg-opacity-80'>
        <ArrowLeftIcon className='w-10 text-white cursor-pointer hover:opacity-80 transition' />
        <p className='text-white text-3xl font-bold'>
          <span className='font-light'>Watching:</span> South Park
        </p>
      </nav>
      <iframe
        src='https://www.youtube.com/embed/m8nKhZY--0g?si=N1TMVGftedW8rR-O?autoplay=1'
        className='h-full w-full'
        allowFullScreen
        allow='autoplay'
      ></iframe>
    </div>
  );
};

export default WatchPage;

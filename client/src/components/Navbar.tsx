import { useEffect, useState } from 'react';

const tabs = [
  'Home',
  'Films',
  'New & Popular',
  'My List',
  'Browse by Languages',
];

const Navbar = () => {
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    });
  }, []);

  return (
    <nav className='w-full fixed z-40'>
      <div
        className={`px-16 py-6 flex items-center ${
          showBackground ? 'bg-black bg-opacity-90' : ''
        }`}
      >
        <img
          src='https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png'
          alt='NetFlix'
          className='h-16'
        />
        <div className='flex gap-7 ml-8'>
          {tabs.map((tab) => (
            <div
              className='text-white hover:text-gray-300 cursor-pointer'
              key={tab}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

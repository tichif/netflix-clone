const HomeBanner = () => {
  return (
    <div className='h-screen w-screen relative'>
      <img
        src='https://assets.nflxext.com/ffe/siteui/vlv3/563192ea-ac0e-4906-a865-ba9899ffafad/13848d06-96bf-4eb9-8143-c8fe0b04d623/HT-en-20231218-popsignuptwoweeks-perspective_alpha_website_large.jpg'
        className='w-full h-full'
        alt=''
      />
      <div className='absolute h-full w-full bg-black bg-opacity-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-white font-bold text-5xl'>
            Unlimited movies, TV Shows, and more
          </h1>
          <p className='text-white text-3xl mt-3'>
            Watch anywhere, Cancel anytime.
          </p>
          <div className='mt-8'>
            <a
              className='bg-red-700 mt-8 text-white p-4 px-16 text-lg rounded font-semibold'
              href='/login'
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;

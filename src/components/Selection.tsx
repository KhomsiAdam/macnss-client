import { useNavigate } from 'react-router-dom';

const Selection = () => {
  const navigate = useNavigate();
  return (
    <div className='grid grid-cols-3 mx-auto place-content-center w-fit'>
      <button
        className='h-[200px] w-[200px] bg-primary-500 grid place-content-center justify-items-center text-white hover:bg-secondary-500 rounded-full hover:scale-110 transition-all shadow-xl mx-4'
        onClick={() => navigate('/dashboard/clients')}
      >
        <svg
          className='w-16 h-16'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
          ></path>
        </svg>
        <span className='mt-3 font-bold'>All clients</span>
      </button>
      <button
        className='h-[200px] w-[200px] bg-primary-500 grid place-content-center justify-items-center text-white hover:bg-secondary-500 rounded-full hover:scale-110 transition-all shadow-xl mx-4'
        onClick={() => navigate('/dashboard/create')}
      >
        <svg
          className='w-16 h-16'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
          ></path>
        </svg>
        <span className='mt-3 font-bold'>Create a record</span>
      </button>
      <button
        className='h-[200px] w-[200px] bg-primary-500 grid place-content-center justify-items-center text-white hover:bg-secondary-500 rounded-full hover:scale-110 transition-all shadow-xl mx-4'
        onClick={() => navigate('/dashboard/records')}
      >
        <svg
          className='w-16 h-16'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
          ></path>
        </svg>
        <span className='mt-3 font-bold'>Medical records</span>
      </button>
    </div>
  );
};
export default Selection;

import { useState, useEffect, useContext } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import DashboardContext from '../context/DashboardContext';
import Selection from '../components/Selection';
import Users from '../components/Users';
import Records from '../components/Records';
import Create from '../components/Create';

export default function Dashboard() {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const { token, setToken } = useContext(AuthContext);
  const { isDashboard, setIsDashboard, isClients, setIsClients } =
    useContext(DashboardContext);

  const handleLogout = () => {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      setToken('');
      navigate('/');
    }
  };

  // const fetchAuth = async () => {
  //   setIsLoaded(false);
  //   const response = await fetch(`${apiUrl}/files`);
  //   const res = await response.json();
  //   console.log(res);
  //   setIsLoaded(true);
  // };
  useEffect(() => {
    setIsLoaded(false);
    console.log(token);
  }, [token]);

  return (
    <>
      {token !== '' && (
        <>
          <button
            onClick={() => navigate('/dashboard')}
            className='absolute p-3 text-white transition-colors rounded-full top-5 left-5 bg-primary-500 hover:bg-secondary-500'
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
              ></path>
            </svg>
          </button>
          <button
            onClick={handleLogout}
            className='absolute p-3 text-white transition-colors rounded-full top-5 right-5 bg-primary-500 hover:bg-secondary-500'
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
              ></path>
            </svg>
          </button>
          <div className='mx-auto mb-16'>
            <img src='/assets/images/cnss.png' alt='test' />
          </div>
          <>
            <Routes>
              <Route path='/' element={<Selection />} />
              <Route path='clients' element={<Users />} />
              <Route path='create' element={<Create />} />
              <Route path='records' element={<Records />} />
            </Routes>
          </>
        </>
        // ) : (
        //   <Spinner />
      )}
    </>
  );
}

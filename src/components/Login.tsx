import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import AuthContext from '../context/AuthContext';
import * as yup from 'yup';
import { apiUrl } from '../../constants';
import { useNavigate } from 'react-router-dom';

interface LoginInputs {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token') as string);
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginInputs> = async (data: any) => {
    const response = await fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    localStorage.setItem('token', res.token);
    navigate('/dashboard');
  };

  return (
    <>
      <div className='mx-auto mb-6'>
        <img src='/assets/images/cnss.png' alt='test' />
      </div>
      <form
        className='container max-w-lg mx-auto'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='grid grid-cols-1 gap-4'>
          <label className='text-lg font-medium text-gray-700 select-none'>
            Email
          </label>
          <input
            className='input-primary'
            type='email'
            placeholder='admin@email.com'
            value='admin@email.com'
            {...register('email')}
          />
          <p className='text-lg font-medium select-none text-primary-500'>
            {errors.email?.message}
          </p>
        </div>
        <div className='grid grid-cols-1 gap-4'>
          <label className='text-lg font-medium text-gray-700 select-none'>
            Password
          </label>
          <input
            className='input-primary'
            type='password'
            placeholder='admin123**'
            value='admin123**'
            {...register('password')}
          />
          <p className='text-lg font-medium select-none text-primary-500'>
            {errors.password?.message}
          </p>
        </div>
        <div className='flex justify-end'>
          <button className='w-full py-3 mt-4 text-lg select-none btn-primary'>
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;

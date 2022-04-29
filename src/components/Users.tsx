import { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import AuthContext from '../context/AuthContext';
import Spinner from './Spinner';
import { apiUrl } from '../../constants';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const { token, setToken } = useContext(AuthContext);
  const [users, setUsers] = useState<any[]>([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const response = await fetch(`${apiUrl}/clients`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      const res = await response.json();
      setUsers(res);
    } else {
      setToken('');
      localStorage.removeItem('token');
      navigate('/');
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      {token !== '' && Array.isArray(users) && users.length > 0 ? (
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg mx-auto w-[90%] custom-scrollbar'>
          <table className='w-full text-sm text-left text-gray-500'>
            <thead className='text-xs text-white uppercase bg-primary-500'>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  Name
                </th>
                <th scope='col' className='px-6 py-3'>
                  Ref
                </th>
                <th scope='col' className='px-6 py-3'>
                  CIN
                </th>
                <th scope='col' className='px-6 py-3'>
                  Email
                </th>
                <th scope='col' className='px-6 py-3'>
                  Phone
                </th>
                <th scope='col' className='px-6 py-3'>
                  Birthdate
                </th>
                <th scope='col' className='px-6 py-3'>
                  Address
                </th>
                <th scope='col' className='px-6 py-3'>
                  City
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any) => (
                <tr
                  key={user._id}
                  className='bg-white border-b hover:bg-gray-50 '
                >
                  <th
                    scope='row'
                    className='px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap'
                  >
                    {user.firstname} {user.lastname}
                  </th>
                  <td className='px-6 py-4'>{user.ref}</td>
                  <td className='px-6 py-4'>{user.CIN}</td>
                  <td className='px-6 py-4'>{user.email}</td>
                  <td className='px-6 py-4'>{user.phone}</td>
                  <td className='px-6 py-4'>{moment(user.birthdate).format('YYYY-MM-DD')}</td>
                  <td className='px-6 py-4'>{user.address}</td>
                  <td className='px-6 py-4'>{user.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Users;

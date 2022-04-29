import { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import AuthContext from '../context/AuthContext';
import Spinner from './Spinner';
import { apiUrl } from '../../constants';
import { useNavigate } from 'react-router-dom';

const Records = () => {
  const { token, setToken } = useContext(AuthContext);
  const [files, setFiles] = useState<any[]>([]);
  const navigate = useNavigate();

  const fetchFiles = async () => {
    const response = await fetch(`${apiUrl}/files`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      const res = await response.json();
      setFiles(res);
    } else {
      setToken('');
      localStorage.removeItem('token');
      navigate('/');
    }
  };
  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <>
      {token !== '' && Array.isArray(files) && files.length > 0 ? (
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg mx-auto w-[90%] custom-scrollbar'>
          <table className='w-full text-sm text-left text-gray-500'>
            <thead className='text-xs text-white uppercase bg-primary-500'>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  Reference
                </th>
                <th scope='col' className='px-6 py-3'>
                  Client
                </th>
                <th scope='col' className='px-6 py-3'>
                  Beneficiary
                </th>
                <th scope='col' className='px-6 py-3'>
                  CIN
                </th>
                <th scope='col' className='px-6 py-3'>
                  Medicines
                </th>
                <th scope='col' className='px-6 py-3'>
                  Refund
                </th>
                <th scope='col' className='px-6 py-3'>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {files.map((file: any) => (
                <tr
                  key={file?._id}
                  className='bg-white border-b hover:bg-gray-50 '
                >
                  <th
                    scope='row'
                    className='px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap'
                  >
                    {file?.ref}
                  </th>
                  <td className='px-6 py-4'>{file?.client?.firstname} {file?.client?.lastname}</td>
                  <td className='px-6 py-4'>{file?.firstname} {file?.lastname}</td>
                  <td className='px-6 py-4'>{file?.CIN}</td>
                  <td className='px-6 py-4'>
                    {Array.isArray(file?.medicines) && file?.medicines.length > 0 ? (<span>show</span>) : (<span>none</span>)}
                    </td>
                  <td className='px-6 py-4'>{file.refund ? (<span>{file?.refund}dh</span>) : (<span>no refund</span>)}</td>
                  <td className='px-6 py-4'>{file?.status}</td>
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

export default Records;

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import AuthContext from '../context/AuthContext';
import * as yup from 'yup';
import { apiUrl } from '../../constants';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CreateInputs {
  firstname: string;
  lastname: string;
  day: number;
  month: number;
  year: number;
  email: string;
  phone: string;
  CIN: string;
  address: string;
  city: string;
  clientRef: string;
}

const schema = yup.object().shape({
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  day: yup.number().required().min(1).max(31).typeError('invalid day'),
  month: yup.number().required().min(1).max(12).typeError('invalid month'),
  year: yup.number().required().typeError('invalid year'),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  CIN: yup.string().required(),
  address: yup.string().required(),
  city: yup.string().required(),
  clientRef: yup.string().required(),
});

const Create = () => {
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState<string[]>([]);
  const [clients, setClients] = useState<string[]>([]);
  const { token, setToken } = useContext(AuthContext);
  const [inputList, setInputList] = useState([{ medicine: '' }]);
  const [selectedMedicines, setSelectedMedicines] = useState([]);

  function handleMultipleChange(e: any) {
    const value = e.target.value;
    setSelectedMedicines([...selectedMedicines, value]);
  }

  // handle input change
  // const handleInputChange = (e: any, index: any) => {
  //   const { name, value } = e.target;
  //   const list = [...inputList];
  //   //@ts-ignore
  //   list[index][name] = value;
  //   setInputList(list);
  // };

  // handle click event of the Remove button
  const handleRemoveClick = (index: any) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { medicine: '' }]);
  };

  const getClients = async () => {
    const response = await fetch(`${apiUrl}/clients`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      const res = await response.json();
      setClients(res);
    } else {
      setToken('');
      localStorage.removeItem('token');
      navigate('/');
    }
  };

  const getMedicines = async () => {
    const response = await fetch(`${apiUrl}/medicines`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      const res = await response.json();
      setMedicines(res);
    } else {
      setToken('');
      localStorage.removeItem('token');
      navigate('/');
    }
  };

  useEffect(() => {
    getMedicines();
    getClients();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateInputs>({
    resolver: yupResolver(schema),
  });

  const handleInputNumbers = (e: any) => {
    // if (e.target.value.length > e.target.maxLength) {
    //   e.target.value = e.target.value.slice(0, e.target.maxLength);
    // }
    // check if e.target.value is a number
    if (e.target.value !== '') {
      if (parseInt(e.target.value) <= 0) {
        e.target.value = parseInt(e.target.min);
      } else if (e.target.value > parseInt(e.target.max)) {
        e.target.value = parseInt(e.target.max);
      } else {
        e.target.value = parseInt(e.target.value);
      }
    }
  };

  const onSubmit: SubmitHandler<CreateInputs> = async (data: any) => {
    data.birthdate = `${data.year}-${('0' + data.month).slice(-2)}-${(
      '0' + data.day
    ).slice(-2)}`;
    delete data.year;
    delete data.month;
    delete data.day;
    data.medicineRefs = selectedMedicines;
    console.log(data);
    const response = await fetch(`${apiUrl}/files`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    console.log(res);
  };

  return (
    <>
      <form
        className='container max-w-lg mx-auto my-12 overflow-auto custom-scrollbar'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='grid grid-cols-1 gap-4'>
          <label className='text-lg font-medium text-gray-700 select-none'>
            Firstname
          </label>
          <input
            className='input-primary'
            type='text'
            value='Firstname'
            {...register('firstname')}
          />
          <p className='text-lg font-medium select-none text-primary-500'>
            {errors.firstname?.message}
          </p>
        </div>
        <div className='grid grid-cols-1 gap-4'>
          <label className='text-lg font-medium text-gray-700 select-none'>
            Lastname
          </label>
          <input
            className='input-primary'
            type='text'
            value='Lastname'
            {...register('lastname')}
          />
          <p className='text-lg font-medium select-none text-primary-500'>
            {errors.lastname?.message}
          </p>
        </div>
        <div className='grid grid-cols-1 gap-4'>
          <label className='text-lg font-medium text-gray-700 select-none'>
            Birthdate
          </label>
          <div className='grid grid-cols-[1fr,1fr,2fr] gap-4'>
            <div className='grid gap-2'>
              <input
                className='w-full text-center input-primary'
                type='number'
                placeholder='DD'
                value={1}
                min={1}
                max={31}
                // maxLength={2}
                onInput={handleInputNumbers}
                {...register('day')}
              />
            </div>
            <div className='grid gap-2'>
              <input
                className='w-full text-center input-primary'
                type='number'
                placeholder='MM'
                value={1}
                min={1}
                max={12}
                // maxLength={2}
                onInput={handleInputNumbers}
                {...register('month')}
              />
            </div>
            <div className='grid gap-2'>
              <input
                className='w-full text-center input-primary'
                type='number'
                placeholder='YYYY'
                value={1991}
                min={1900}
                max={new Date().getFullYear() - 18}
                // maxLength={4}
                onInput={handleInputNumbers}
                {...register('year')}
              />
            </div>
          </div>
          <p className='text-lg font-medium select-none text-primary-500'>
            {errors.day?.message} {errors.month?.message} {errors.year?.message}
          </p>
        </div>
        <div className='grid grid-cols-1 gap-4'>
          <label className='text-lg font-medium text-gray-700 select-none'>
            Email
          </label>
          <input
            className='input-primary'
            type='email'
            value='example@cnss.net'
            {...register('email')}
          />
          <p className='text-lg font-medium select-none text-primary-500'>
            {errors.email?.message}
          </p>
        </div>
        <div className='grid grid-cols-1 gap-4'>
          <label className='text-lg font-medium text-gray-700 select-none'>
            Phone
          </label>
          <input
            className='input-primary'
            value='0123456789'
            type='text'
            {...register('phone')}
          />
          <p className='text-lg font-medium select-none text-primary-500'>
            {errors.phone?.message}
          </p>
        </div>
        <div className='grid grid-cols-1 gap-4'>
          <label className='text-lg font-medium text-gray-700 select-none'>
            CIN
          </label>
          <input
            className='input-primary'
            value='A123456'
            type='text'
            {...register('CIN')}
          />
          <p className='text-lg font-medium select-none text-primary-500'>
            {errors.CIN?.message}
          </p>
        </div>
        <div className='grid grid-cols-1 gap-4'>
          <label className='text-lg font-medium text-gray-700 select-none'>
            Address
          </label>
          <input
            className='input-primary'
            type='text'
            value='Address'
            {...register('address')}
          />
          <p className='text-lg font-medium select-none text-primary-500'>
            {errors.address?.message}
          </p>
        </div>
        <div className='grid grid-cols-1 gap-4'>
          <label className='text-lg font-medium text-gray-700 select-none'>
            City
          </label>
          <input
            className='input-primary'
            type='text'
            value='City'
            {...register('city')}
          />
          <p className='text-lg font-medium select-none text-primary-500'>
            {errors.city?.message}
          </p>
        </div>
        <div className='grid grid-cols-1 gap-4'>
          <label className='text-lg font-medium text-gray-700 select-none'>
            Client
          </label>
          <select
            className='input-primary'
            defaultValue=''
            {...register('clientRef')}
          >
            <option value='' disabled hidden>
              -- Select a client --
            </option>
            {clients.map((client: any) => (
              <option key={client._id} value={client.ref}>
                {client.firstname} {client.lastname} - (ref: {client.ref})
              </option>
            ))}
          </select>
          <p className='text-lg font-medium select-none text-primary-500'>
            {errors.clientRef?.message}
          </p>
        </div>
        <div className='grid grid-cols-1 gap-4'>
          <label className='text-lg font-medium text-gray-700 select-none'>
            Pick Medicines
          </label>
          {inputList.map((x, i) => {
            return (
              <>
                <select
                  className='input-primary'
                  name={`medicine${i}`}
                  key={i}
                  onChange={handleMultipleChange}
                  defaultValue=''
                >
                  <option value='' disabled hidden>
                    -- Select a medicine --
                  </option>
                  {medicines.map((medicine: any) => (
                    <option key={medicine._id} value={medicine.ref}>
                      {medicine?.name} - (ref: {medicine.ref})
                    </option>
                  ))}
                </select>
                <div>
                  {inputList.length - 1 === i && (
                    <button
                      className='mr-3 btn-primary'
                      onClick={handleAddClick}
                    >
                      Add
                    </button>
                  )}
                  {inputList.length !== 1 && (
                    <button
                      className='mr-3 btn-danger'
                      onClick={() => handleRemoveClick(i)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </>
            );
          })}
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

export default Create;

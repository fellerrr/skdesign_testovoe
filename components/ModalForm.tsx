import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputMask from 'react-input-mask';

import {useDispatch} from 'react-redux';
import { addData } from '@/store/table/tableSlice';
import {DataType} from "@/types/types";






const schema = yup.object().shape({
  id: yup.number().typeError('Допускаются только цифры').required(),
  firstName: yup.string().matches(/^[A-Za-zА-Яа-яЁё]+$/, 'Допускаются только буквы').required(),
  lastName: yup.string().matches(/^[A-Za-zА-Яа-яЁё]+$/, 'Допускаются только буквы').required(),
  email: yup.string().email().required(),
  phone: yup.string().matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Неправильно записан номер').required()
});

export default function Form({ closeModal }: { closeModal: () => void }) {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<DataType>({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: DataType) => {
    dispatch(addData(data));
    closeModal()
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <button
        className="absolute right-10 top-10 bg-blue-500 hover:bg-blue-700 text-white
           font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={closeModal}
      >
        Закрыть
      </button>
      <div className="mb-4">
        <label htmlFor="id" className="block text-gray-700 text-sm font-bold mb-2">ID:</label>
        <input type="text" {...register('id')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="id" />
        {errors.id && <p className="text-red-500 text-xs italic">{errors.id.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">First Name:</label>
        <input type="text" {...register('firstName')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstName" />
        {errors.firstName && <p className="text-red-500 text-xs italic">{errors.firstName.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Last Name:</label>
        <input type="text" {...register('lastName')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastName" />
        {errors.lastName && <p className="text-red-500 text-xs italic">{errors.lastName.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
        <input type="text" {...register('email')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" />
        {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone:</label>
        {/*<InputMask mask="+7 (999) 999-99-99" {...register('phone')}>*/}
        {/*  {(inputProps) => (*/}
        {/*    <input {...inputProps} type="tel" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" />*/}
        {/*  )}*/}
        {/*</InputMask>*/}
        {/*<InputMask mask="+7 (999) 999-99-99" {...register('phone')}>*/}
        {/*  {(inputProps: { value: string; onChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) => (*/}
        {/*    <input*/}
        {/*      {...inputProps}*/}
        {/*      type="tel"*/}
        {/*      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"*/}
        {/*      id="phone"*/}
        {/*    />*/}
        {/*  )}*/}
        {/*</InputMask>*/}
        <InputMask
          mask="+7 (999) 999-99-99"
          {...register('phone')}
          maskChar="_"
        >
          <input
            type="tel"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
          />
        </InputMask>
        {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone.message}</p>}
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white
           font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Отправить
        </button>
      </div>
    </form>
  );
}

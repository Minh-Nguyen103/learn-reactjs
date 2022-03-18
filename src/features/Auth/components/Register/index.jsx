import { unwrapResult } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../../../features/Auth/userSlice';
import RegisterForm from '../RegisterForm';

Register.propTypes = {};

function Register(props) {
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    try {
      values.username = values.email;

      const action = register(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
    } catch (error) {
      console.log('Failed to error', error);
    }
  };

  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;

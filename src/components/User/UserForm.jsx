import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import UserSignupForm from './UserSignupForm';
import UserLoginForm from './UserLoginForm';

import styles from '../../styles/User.module.css';

import { toggleForm, toggleFormType } from '../../redux/user/slice';

const UserForm = () => {
  const { showForm, formType } = useSelector(({ user }) => user);
  const dispatch = useDispatch();

  const toggleCurrentFormType = (type) => dispatch(toggleFormType(type));

  const closeForm = () => dispatch(toggleForm(false));
  return showForm ? (
    <>
      <div className={styles.overlay} onClick={closeForm} />
      {formType === 'signup' ? (
        <UserSignupForm toggleCurrentFormType={toggleCurrentFormType} closeForm={closeForm} />
      ) : (
        <UserLoginForm toggleCurrentFormType={toggleCurrentFormType} closeForm={closeForm} />
      )}
    </>
  ) : (
    <></>
  );
};

export default UserForm;

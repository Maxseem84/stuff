import React from 'react';
import { useDispatch } from 'react-redux';

import styles from '../../styles/User.module.css';

import { createUser } from '../../redux/user/asyncActions';

const UserSignupForm = ({ toggleCurrentFormType, closeForm }) => {
  const dispatch = useDispatch();
  const [values, setValues] = React.useState({
    name: '',
    email: '',
    password: '',
    avatar: '',
  });

  const onHandleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    const isNotEmpty = Object.values(values).every((val) => val);
    if (!isNotEmpty) return;
    dispatch(createUser(values));
    closeForm();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.close} onClick={closeForm}>
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
        </svg>
      </div>

      <div className={styles.title}>Sign Up</div>

      <form className={styles.form} onSubmit={onHandleSubmit}>
        <div className={styles.group}>
          <input
            type="email"
            placeholder="Your email"
            name="email"
            autoComplete="off"
            value={values.email}
            onChange={onHandleChange}
            required
          />
        </div>

        <div className={styles.group}>
          <input
            type="name"
            placeholder="Your name"
            name="name"
            autoComplete="off"
            value={values.name}
            onChange={onHandleChange}
            required
          />
        </div>

        <div className={styles.group}>
          <input
            type="password"
            placeholder="Your password"
            name="password"
            autoComplete="off"
            value={values.password}
            onChange={onHandleChange}
            required
          />
        </div>

        <div className={styles.group}>
          <input
            type="avatar"
            placeholder="Your avatar"
            name="avatar"
            autoComplete="off"
            value={values.avatar}
            onChange={onHandleChange}
            required
          />
        </div>

        <div onClick={() => toggleCurrentFormType('login')} className={styles.link}>
          I already have an account
        </div>

        <button type="submit" className={styles.submit}>
          Create an account
        </button>
      </form>
    </div>
  );
};

export default UserSignupForm;

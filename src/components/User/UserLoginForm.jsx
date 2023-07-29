import React from 'react';
import { useDispatch } from 'react-redux';

import styles from '../../styles/User.module.css';

import { loginUser } from '../../redux/user/asyncActions';

const UserLoginForm = ({ toggleCurrentFormType, closeForm }) => {
  const dispatch = useDispatch();
  const [values, setValues] = React.useState({
    email: '',
    password: '',
  });

  const onHandleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    const isNotEmpty = Object.values(values).every((val) => val);
    if (!isNotEmpty) return;
    dispatch(loginUser(values));
    closeForm();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.close} onClick={closeForm}>
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
        </svg>
      </div>

      <div className={styles.title}>Log In</div>

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
            type="password"
            placeholder="Your password"
            name="password"
            autoComplete="off"
            value={values.password}
            onChange={onHandleChange}
            required
          />
        </div>

        <div onClick={() => toggleCurrentFormType('signup')} className={styles.link}>
          Create an account
        </div>

        <button type="submit" className={styles.submit}>
          Login
        </button>
      </form>
    </div>
  );
};

export default UserLoginForm;

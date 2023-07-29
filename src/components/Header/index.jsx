import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import styles from '../../styles/Header.module.css';

import { routes } from '../../utils/routes';

import Logo from '../../images/logo.svg';
import Avatar from '../../images/avatar.jpg';

import { toggleForm } from '../../redux/user/slice';
import { useGetProductsQuery } from '../../redux/api/apiSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, cart } = useSelector(({ user }) => user);
  const [values, setValues] = React.useState({
    name: 'Guest',
    avatar: Avatar,
  });
  const [searchValue, setSearchValue] = React.useState('');
  const onHandleSearchValue = ({ target: { value } }) => {
    setSearchValue(value);
  };
  const { data, isLoading } = useGetProductsQuery({ title: searchValue });
  React.useEffect(() => {
    if (!currentUser) return;
    setValues(currentUser);
  }, [currentUser]);
  const onHandleClick = () => {
    if (!currentUser) {
      dispatch(toggleForm(true));
    } else {
      navigate(routes.profile);
    }
  };
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to={routes.home}>
          <img src={Logo} alt="Stuff" />
        </Link>
      </div>
      <div className={styles.info}>
        <div className={styles.user} onClick={onHandleClick}>
          <div className={styles.avatar} style={{ backgroundImage: `url(${values.avatar})` }}></div>
          <div className={styles.username}>{values.name}</div>
        </div>
      </div>
      <form className={styles.form}>
        <div className={styles.icon}>
          <svg className="icon">
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`} />
          </svg>
        </div>
        <div className={styles.input}>
          <input
            type="search"
            name="search"
            placeholder="Search for anything..."
            autoComplete="off"
            onChange={onHandleSearchValue}
            value={searchValue}
          />
        </div>
        {searchValue && (
          <div className={styles.box}>
            {isLoading
              ? 'Loading'
              : !data.length
              ? 'No results'
              : data.map(({ title, images, id }) => {
                  return (
                    <Link
                      key={id}
                      onClick={() => setSearchValue('')}
                      className={styles.item}
                      to={`/products/${id}`}>
                      <div
                        className={styles.image}
                        style={{ backgroundImage: `url(${images[0]})` }}
                      />
                      <div className={styles.title}>{title}</div>
                    </Link>
                  );
                })}
          </div>
        )}
      </form>
      <div className={styles.account}>
        <Link to={routes.home} className={styles.favourites}>
          <svg className={styles['icon-fav']}>
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
          </svg>
        </Link>
        <Link to={routes.cart} className={styles.cart}>
          <svg className={styles['icon-cart']}>
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`} />
          </svg>
          {!!cart.length && <span className={styles.count}>{cart.length}</span>}
        </Link>
      </div>
    </header>
  );
};

export default Header;

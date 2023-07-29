import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Poster from '../../components/Poster';
import Products from '../../components/Products';
import Categories from '../../components/Categories';
import Banner from '../../components/Banner';

import { filterByPrice } from './../../redux/products/slice';

const Home = () => {
  const dispatch = useDispatch();
  const {
    products: { list, filtered },
    categories,
  } = useSelector((state) => state);
  React.useEffect(() => {
    if (!list.length) return;
    dispatch(filterByPrice(100));
  }, [dispatch, list.length]);

  return (
    <>
      <Poster />
      <Products products={list} amount={5} title="Trending" />
      <Categories categories={categories.list} amount={5} title="Worth seeing" />
      <Banner />
      <Products products={filtered} amount={5} title="Less than 100$" />
    </>
  );
};

export default Home;

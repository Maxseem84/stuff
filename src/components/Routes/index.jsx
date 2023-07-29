import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './../../pages/Home';
import SingleProduct from './../../pages/SingleProduct';
import Cart from './../../pages/Cart';
import Profile from './../../pages/Profile';
import SingleCategory from '../../pages/SingleCategory';

import { routes } from './../../utils/routes';

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />}></Route>
      <Route path={routes.product} element={<SingleProduct />}></Route>
      <Route path={routes.cart} element={<Cart />}></Route>
      <Route path={routes.profile} element={<Profile />}></Route>
      <Route path={routes.category} element={<SingleCategory />}></Route>
    </Routes>
  );
};

export default AppRoutes;

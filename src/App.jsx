import React from 'react';
import { useDispatch } from 'react-redux';

import AppRoutes from './components/Routes';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import UserForm from './components/User/UserForm';

import { fetchCategories } from './redux/categories/asyncActions';
import { fetchProducts } from './redux/products/asyncActions';

const App = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <div className="app">
      <Header />
      <UserForm />
      <div className="container">
        <Sidebar />
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
};

export default App;

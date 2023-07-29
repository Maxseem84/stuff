import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useGetProductQuery } from '../../redux/api/apiSlice';
import { getRelatedProducts } from '../../redux/products/slice';

import { routes } from '../../utils/routes';

import Product from './../../components/Product';
import Products from './../../components/Products';

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const { list, related } = useSelector((state) => state.products);

  const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({ id });

  React.useEffect(() => {
    if (!isFetching && !isLoading && !isSuccess) {
      navigate(routes.home);
    }
  }, [isLoading, isFetching, isSuccess, navigate]);

  React.useEffect(() => {
    if (!data || !list.length) return;
    dispatch(getRelatedProducts(data.category.id));
  }, [data, dispatch, list.length]);

  return !data ? (
    <section className="preloader">Loading...</section>
  ) : (
    <>
      <Product {...data} />
      <Products products={related} amount={5} title="Related products" />
    </>
  );
};

export default SingleProduct;

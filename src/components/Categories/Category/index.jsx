import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Products from '../../Products';

import { useGetProductsQuery } from '../../../redux/api/apiSlice';

import styles from '../../../styles/Category.module.css';

const Category = () => {
  const { id } = useParams();
  const { list } = useSelector(({ categories }) => categories);

  const defaultValues = {
    title: '',
    price_min: 0,
    price_max: 0,
  };

  const defaultParams = {
    categoryId: id,
    limit: 5,
    offset: 0,
    ...defaultValues,
  };

  const [isEnd, setIsEnd] = useState(false);
  const [cat, setCat] = useState(null);
  const [items, setItems] = useState([]);
  const [values, setValues] = useState(defaultValues);
  const [params, setParams] = useState(defaultParams);

  const { data = [], isLoading, isSuccess } = useGetProductsQuery(params);

  useEffect(() => {
    if (!id) return;
    setValues(defaultValues);
    setItems([]);
    setIsEnd(false);
    setParams({ ...defaultParams, categoryId: id });
  }, [id]);

  useEffect(() => {
    if (isLoading) return;
    if (!data.length) return setIsEnd(true);
    setItems((_items) => [..._items, ...data]);
  }, [data, isLoading]);

  useEffect(() => {
    if (!id || !list.length) return;
    const category = list.find((item) => item.id === id * 1);
    setCat(category);
  }, [list, id]);

  const onHandleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    setItems([]);
    setIsEnd(false);
    setParams({ ...defaultParams, ...values });
  };

  const handleReset = () => {
    setValues(defaultValues);
    setParams(defaultParams);
    setIsEnd(false);
  };

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>{cat?.name}</h2>

      <form className={styles.filters} onSubmit={onHandleSubmit}>
        <div className={styles.filter}>
          <input
            type="text"
            name="title"
            placeholder="Product name"
            value={values.title}
            onChange={onHandleChange}
          />
        </div>
        <div className={styles.filter}>
          <input
            type="number"
            name="price_min"
            placeholder="0"
            value={values.price_min}
            onChange={onHandleChange}
          />
          <span>Price from</span>
        </div>
        <div className={styles.filter}>
          <input
            type="number"
            name="price_max"
            placeholder="0"
            value={values.price_max}
            onChange={onHandleChange}
          />
          <span>Price to</span>
        </div>

        <button type="submit" hidden />
      </form>

      {isLoading ? (
        <div className="preloader">Loading...</div>
      ) : !isSuccess || !items.length ? (
        <div className={styles.back}>
          <span>No results</span>
          <button onClick={handleReset}>Reset</button>
        </div>
      ) : (
        <Products title="" products={items} style={{ padding: 0 }} amount={items.length} />
      )}

      {!isEnd && (
        <div className={styles.more}>
          <button onClick={() => setParams({ ...params, offset: params.offset + params.limit })}>
            See more
          </button>
        </div>
      )}
    </section>
  );
};

export default Category;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map(prod => (
          <li key={prod.id}>{prod.name} - ₹{prod.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;

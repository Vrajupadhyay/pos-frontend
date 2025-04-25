import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Simulating fake data
    const fakeData = [
      { id: 1, name: 'Milk', price: 50 },
      { id: 2, name: 'Bread', price: 30 },
      { id: 3, name: 'Butter', price: 80 },
    ];
    setProducts(fakeData);
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

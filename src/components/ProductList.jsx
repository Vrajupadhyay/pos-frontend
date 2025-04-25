import React, { useEffect, useState } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fakeData = [
      { id: 1, name: 'Milk', price: 50 },
      { id: 2, name: 'Bread', price: 30 },
      { id: 3, name: 'Butter', price: 80 },
    ];
    setProducts(fakeData);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Available Products</h2>
      <ul className="space-y-2">
        {products.map(prod => (
          <li
            key={prod.id}
            className="p-3 border border-gray-300 rounded-md flex justify-between"
          >
            <span>{prod.name}</span>
            <span className="text-gray-600">₹{prod.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;

import React, { useState } from 'react';
import ProductList from './components/ProductList';
import OrderForm from './components/OrderForm';
import './App.css';

function App() {
  const [activeScreen, setActiveScreen] = useState('products');

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <div className="mb-4 flex space-x-4">
        <button
          className={`px-4 py-2 rounded ${activeScreen === 'products' ? 'bg-blue-600 text-white' : 'bg-white border'}`}
          onClick={() => setActiveScreen('products')}
        >
          Product List
        </button>
        <button
          className={`px-4 py-2 rounded ${activeScreen === 'order' ? 'bg-blue-600 text-white' : 'bg-white border'}`}
          onClick={() => setActiveScreen('order')}
        >
          Order Form
        </button>
      </div>

      <div className="bg-white p-6 rounded shadow-md">
        {activeScreen === 'products' && <ProductList />}
        {activeScreen === 'order' && <OrderForm />}
      </div>
    </div>
  );
}

export default App;

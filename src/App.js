import React from 'react';
import ProductList from './components/ProductList';
import OrderForm from './components/OrderForm';
import OrderList from './components/OrderList';

function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>🛒 POS System</h1>
      <ProductList />
      <hr />
      <OrderForm />
      {/* <hr /> */}
      {/* <OrderList /> */}
    </div>
  );
}

export default App;

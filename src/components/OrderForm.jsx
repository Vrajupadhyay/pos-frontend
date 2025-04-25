import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderForm = () => {
  const [userId, setUserId] = useState(1);
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [orders, setOrders] = useState([]);

  // Fake initial order data
  const fakeOrders = [
    { order_id: 1, product_name: 'Milk', quantity: 2, username: 'John Doe' },
    { order_id: 2, product_name: 'Cheese', quantity: 1, username: 'Jane Smith' },
  ];

  useEffect(() => {
    // Simulate fetching orders with fake data
    setOrders(fakeOrders);
  }, []);

  const placeOrder = async () => {
    try {
      // Create a new order object
      const newOrder = {
        order_id: orders.length + 1, // Generate a fake order ID
        product_name: `Product ${productId}`, // Simulate product name
        quantity: parseInt(quantity, 10),
        username: `User ${userId}`, // Simulate username
      };

      // Temporarily add the new order to the local state
      setOrders([...orders, newOrder]);

      // Clear the input fields
      setProductId('');
      setQuantity('');

      // Simulate a success message
      alert('Order placed! ID: ' + newOrder.order_id);

      // Optionally, you can still call the backend API here
      // await axios.post('http://localhost:4000/orders', {
      //   user_id: userId,
      //   product_id: productId,
      //   quantity
      // });
    } catch (err) {
      alert('Error placing order');
    }
  };

  return (
    <div>
      <h2>Place Order</h2>
      <input
        placeholder="Product ID"
        value={productId}
        onChange={e => setProductId(e.target.value)}
      />
      <input
        placeholder="Quantity"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
      />
      <button onClick={placeOrder}>Order</button>

      <h2>Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order.order_id}>
            {order.product_name} - Quantity: {order.quantity} (Ordered by: {order.username})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderForm;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderForm = () => {
  const [userId, setUserId] = useState(1);
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:4000/orders');
      setOrders(res.data);
    } catch (err) {
      console.error('Error fetching orders', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const placeOrder = async () => {
    try {
      const res = await axios.post('http://localhost:4000/orders', {
        user_id: userId,
        product_id: productId,
        quantity
      });
      // clear the input fields
      setProductId('');
      setQuantity('');
      alert('Order placed! ID: ' + res.data.orderId);
      fetchOrders(); // Refresh the order list after placing an order
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

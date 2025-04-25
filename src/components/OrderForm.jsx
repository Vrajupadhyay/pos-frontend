import React, { useEffect, useState } from 'react';

const OrderForm = () => {
  const [userId, setUserId] = useState(1);
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [orders, setOrders] = useState([]);

  const fakeOrders = [
    { order_id: 1, product_name: 'Milk', quantity: 2, username: 'John Doe' },
    { order_id: 2, product_name: 'Cheese', quantity: 1, username: 'Jane Smith' },
  ];

  useEffect(() => {
    setOrders(fakeOrders);
  }, []);

  const placeOrder = () => {
    const newOrder = {
      order_id: orders.length + 1,
      product_name: `Product ${productId}`,
      quantity: parseInt(quantity, 10),
      username: `User ${userId}`,
    };

    setOrders([...orders, newOrder]);
    setProductId('');
    setQuantity('');
    alert('Order placed! ID: ' + newOrder.order_id);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Place a New Order</h2>
      <div className="mb-4 space-y-3">
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Product ID"
          value={productId}
          onChange={e => setProductId(e.target.value)}
        />
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Quantity"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
        />
        <button
          className="w-full bg-blue-600 text-white py-2 rounded"
          onClick={placeOrder}
        >
          Place Order
        </button>
      </div>

      <h2 className="text-lg font-semibold mt-6 mb-2">Recent Orders</h2>
      <ul className="space-y-2">
        {orders.map(order => (
          <li
            key={order.order_id}
            className="p-3 border border-gray-300 rounded-md"
          >
            <div className="font-medium">{order.product_name}</div>
            <div className="text-sm text-gray-600">
              Quantity: {order.quantity} | Ordered by: {order.username}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderForm;

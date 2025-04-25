import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/orders')
            .then(res => setOrders(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
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

export default OrderList;

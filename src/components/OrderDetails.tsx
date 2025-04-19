import React from 'react';
import { useOrderDetailsQuery } from '../redux/api/orderAPI';
import Loading from './Loading';

interface OrderDetailsProps {
    orderId: string;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ orderId }) => {
    const { data, isLoading } = useOrderDetailsQuery(orderId);

    if (!data) return null;

    const formatDate = (timestamp: string | Date) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return isLoading ? (
        <Loading />
    ) : (
        <div className='order-details'>
            <div className='order-header'>
                <h2>Order #{data.order._id}</h2>
                <span
                    className={`order-status status-${data.order.status.toLowerCase()}`}
                >
                    {data.order.status}
                </span>
            </div>

            <div className='order-info-grid'>
                <div className='shipping-info'>
                    <h3>Shipping Information</h3>
                    <p>
                        {data.order.shippingInfo.address}
                        <br />
                        {data.order.shippingInfo.city},{' '}
                        {data.order.shippingInfo.state}{' '}
                        {data.order.shippingInfo.pinCode}
                        <br />
                        {data.order.shippingInfo.country}
                        <br />
                        Phone: {data.order.shippingInfo.phoneNo}
                    </p>
                </div>

                <div className='order-meta'>
                    <div className='date-info'>
                        <h3>Order Date</h3>
                        <p>{formatDate(data.order.createdAt!)}</p>
                    </div>

                    <div className='date-info'>
                        <h3>Last Updated</h3>
                        <p>{formatDate(data.order.updatedAt!)}</p>
                    </div>
                </div>
            </div>

            <div className='order-items-section'>
                <h3>Order Items</h3>
                <table className='order-items-table'>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.order.orderItems.map((item) => (
                            <tr key={item._id}>
                                <td>
                                    <div className='product-info'>
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className='product-image'
                                            onError={(e) => {
                                                (
                                                    e.target as HTMLImageElement
                                                ).src =
                                                    '/images/placeholder-product.jpg';
                                            }}
                                        />
                                        <div className='product-details'>
                                            <div className='product-name'>
                                                {item.name}
                                            </div>
                                            <div className='product-id'>
                                                SKU: {item.productId.slice(-6)}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>
                                    {(item.price * item.quantity).toString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='order-summary'>
                <table>
                    <tbody>
                        <tr>
                            <td>Subtotal:</td>
                            <td>{data.order.subTotal}</td>
                        </tr>
                        <tr>
                            <td>Shipping:</td>
                            <td>{data.order.shippingCharges || 0}</td>
                        </tr>
                        <tr>
                            <td>
                                Tax (
                                {(data.order.tax / data.order.subTotal) * 100}
                                %):
                            </td>
                            <td>{data.order.tax}</td>
                        </tr>
                        <tr>
                            <td>Discount:</td>
                            <td>-{data.order.discount}</td>
                        </tr>
                        <tr className='total-row'>
                            <td>Total:</td>
                            <td>{data.order.total}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderDetails;

import { useState } from "react";
import { OrderItemType, OrderType } from "../../types";
import { Link } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";

const img =
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

const orderItems: OrderItemType[] = [
    {
        name: "Puma Shoes",
        photo: img,
        _id: "cdvvvfv",
        quantity: 4,
        price: 2000,
    },
];

const TransactionManagement = () => {
    const [order, setOrder] = useState<OrderType>({
        name: "Kuldeep",
        address: "77 Black Street",
        city: "Ahmedabad",
        state: "Gujarat",
        country: "India",
        pinCode: 123456,
        status: "Processing",
        subtotal: 4000,
        discount: 1200,
        shippingCharges: 0,
        tax: 200,
        total: 4000 + 200 + 0 - 1200,
        orderItems,
        _id: "cdvvvfv",
    });

    const {
        name,
        address,
        city,
        state,
        country,
        pinCode,
        status,
        subtotal,
        discount,
        shippingCharges,
        tax,
        total,
    } = order;

    const updateHander = () => {
        setOrder((prev) => ({
            ...prev,
            status: prev.status === "Processing" ? "Shipped" : "Delivered",
        }));
    };

    return (
        <div className="adminContainer">
            <AdminSidebar />
            <main className="productManagementContainer">
                <section style={{ padding: "2rem" }}>
                    <h2>Order Items</h2>

                    {order.orderItems.map((i) => (
                        <ProductCard
                            name={i.name}
                            photo={i.photo}
                            price={i.price}
                            quantity={i.quantity}
                            _id={i._id}
                        />
                    ))}
                </section>

                <article className="shippingInfoCard">
                    <h1>Order Info</h1>
                    <h5>User Info</h5>
                    <p>Name: {name}</p>
                    <p>
                        Address:{" "}
                        {`${address}, ${city}, ${state}, ${country} ${pinCode}`}
                    </p>

                    <h5>Amount Info</h5>
                    <p>Subtotal: {subtotal}</p>
                    <p>Shipping Charges: {shippingCharges}</p>
                    <p>Tax: {tax}</p>
                    <p>Discount: {discount}</p>
                    <p>Total: {total}</p>

                    <h5>Status Info</h5>
                    <p>
                        Status:{" "}
                        <span
                            className={
                                status === "Delivered"
                                    ? "purple"
                                    : status === "Shipped"
                                    ? "green"
                                    : "red"
                            }
                        >
                            {status}
                        </span>
                    </p>

                    <button onClick={updateHander}>Process Status</button>
                </article>
            </main>
        </div>
    );
};

const ProductCard = ({ name, photo, price, quantity, _id }: OrderItemType) => (
    <div className="transactionProductCard">
        <img src={photo} alt="" />
        <Link to={`/products/${_id}`}>{name}</Link>
        <span>
            ${price} X {quantity} = ${price * quantity}
        </span>
    </div>
);

export default TransactionManagement;

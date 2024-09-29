import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";

const cartItems = [
    {
        productId: "1",
        photo: "https://m.media-amazon.com/images/I/514T0SvwkHL._SL1500_.jpg",
        name: "Macbook",
        price: 2000,
        quantity: 2,
        stock: 5,
    },
];

const subtotal = 4000;
const shippingCharges = 200;
const tax = Math.round(subtotal * 0.18);
const discount = 400;
const total = subtotal + shippingCharges + tax - discount;

const Cart = () => {
    const [couponCode, setCouponCode] = useState<string>("");
    const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(true);

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            if (Math.random() > 0.5) setIsValidCouponCode(true);
            else setIsValidCouponCode(false);
        }, 1000);

        return () => {
            clearTimeout(timeOutId);
            setIsValidCouponCode(false);
        };
    }, [couponCode]);

    return (
        <div className="cart">
            <main>
                {cartItems.length > 0 ? cartItems.map((i, idx) => (
                    <CartItem key={idx} cartItem={i} />
                )): <h1>Your cart is empty</h1>}
            </main>
            <aside>
                <p>Subtotal: ₹{subtotal}</p>
                <p>Shipping Charges: ₹{shippingCharges}</p>
                <p>Tax: ₹{tax}</p>
                <p>
                    Discount: <em className="red"> - ₹{discount}</em>
                </p>
                <p>
                    <b>Total: ₹{total}</b>
                </p>

                <input
                    type="text"
                    placeholder="Coupon Code"
                    value={couponCode}
                    onChange={(e) =>
                        setCouponCode(
                            e.target.value.toUpperCase().replace(/\s/g, "")
                        )
                    }
                />

                {couponCode &&
                    (isValidCouponCode ? (
                        <span className="green">
                            ₹{discount} off using the <code>{couponCode}</code>
                        </span>
                    ) : (
                        <span className="red">
                            Invalid Coupon <VscError />
                        </span>
                    ))}

                {cartItems.length > 0 && <Link to="/shipping">Checkout</Link>}
            </aside>
        </div>
    );
};

export default Cart;

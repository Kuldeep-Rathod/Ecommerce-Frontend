import { FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";

type CartItemProps = {
    cartItem: any;
};

const CartItem = ({ cartItem }: CartItemProps) => {
    const { photo, productId, name, price, quantity } = cartItem;

    return (
        <div className="cartItem">
            <img src={photo} alt={name} />
            <article>
                <Link to={`/product/${productId}`} >{name}</Link>
                <span>${price}</span>
            </article>
            <div>
                <button>-</button>
                <span>{quantity}</span>
                <button>+</button>
            </div>

            <button>
                <FaTrash />
            </button>
        </div>
    );
};

export default CartItem;

import { FaTrash } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { server } from '../redux/store';
import { CartItem } from '../types/types';

type CartItemProps = {
    cartItem: CartItem;
    incrementHandler: (cartItem: CartItem) => void;
    decrementHandler: (cartItem: CartItem) => void;
    removeHandler: (id: string) => void;
};

const CartItemCard = ({
    cartItem,
    incrementHandler,
    decrementHandler,
    removeHandler,
}: CartItemProps) => {
    const { photo, productId, name, price, quantity } = cartItem;

    return (
        <div className='cartItem'>
            <img
                src={`${server}/${photo}`}
                alt={name}
            />
            <article>
                <Link to={`/product/${productId}`}>{name}</Link>
                <span>${price}</span>
            </article>
            <div>
                <button onClick={() => decrementHandler(cartItem)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => incrementHandler(cartItem)}>+</button>
            </div>

            <button onClick={() => removeHandler(productId)}>
                <FaTrash />
            </button>
        </div>
    );
};

export default CartItemCard;

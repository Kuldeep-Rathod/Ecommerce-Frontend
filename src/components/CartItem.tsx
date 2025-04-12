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
        <div className='cart-item'>
            <div className='cart-item-image'>
                <img
                    src={`${server}/${photo}`}
                    alt={name}
                    loading='lazy'
                />
            </div>
            
            <div className='cart-item-details'>
                <Link to={`/product/${productId}`} className='cart-item-name'>{name}</Link>
                <span className='cart-item-price'>${price}</span>
                
                <div className='cart-item-quantity-mobile'>
                    <button 
                        onClick={() => decrementHandler(cartItem)}
                        aria-label="Decrease quantity"
                    >
                        -
                    </button>
                    <span>{quantity}</span>
                    <button 
                        onClick={() => incrementHandler(cartItem)}
                        aria-label="Increase quantity"
                    >
                        +
                    </button>
                </div>
            </div>
            
            <div className='cart-item-controls'>
                <div className='cart-item-quantity'>
                    <button 
                        onClick={() => decrementHandler(cartItem)}
                        aria-label="Decrease quantity"
                    >
                        -
                    </button>
                    <span>{quantity}</span>
                    <button 
                        onClick={() => incrementHandler(cartItem)}
                        aria-label="Increase quantity"
                    >
                        +
                    </button>
                </div>
                
                <button 
                    onClick={() => removeHandler(productId)}
                    className='cart-item-remove'
                    aria-label="Remove item"
                >
                    <FaTrash />
                </button>
            </div>
        </div>
    );
};

export default CartItemCard;
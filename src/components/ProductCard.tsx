import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { CartItem } from '../types/types';

interface ProductCardProps {
    productId: string;
    photo: string;
    name: string;
    price: number;
    stock: number;
    handler: (cartItem: CartItem) => void;
    toggleHandler: (productId: string) => void;
    isWishlisted: boolean;
}

const ProductCard = ({
    productId,
    photo,
    name,
    price,
    stock,
    handler,
    toggleHandler,
    isWishlisted: isWishlistedProp,
}: ProductCardProps) => {
    const stockStatus =
        stock === 0 ? 'out-of-stock' : stock < 10 ? 'low-stock' : 'in-stock';
    const [isWishlisted, setIsWishlisted] = useState(isWishlistedProp);

    const handleWishlistToggle = () => {
        setIsWishlisted((prev) => !prev);
        toggleHandler(productId);
    };

    return (
        <div className='productCard'>
            {stock < 10 && (
                <span className={`stock-indicator ${stockStatus}`}>
                    {stock === 0 ? 'Sold Out' : `Only ${stock} left`}
                </span>
            )}
            <img
                src={photo}
                alt={name}
            />
            <p>{name}</p>
            <span>₹{price.toFixed(2)}</span>
            <div>
                <button
                    onClick={() =>
                        handler({
                            productId,
                            photo,
                            name,
                            price,
                            stock,
                            quantity: 1,
                        })
                    }
                    disabled={stock === 0}
                >
                    {stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
                <div
                    className='favorite'
                    onClick={handleWishlistToggle}
                >
                    {isWishlisted ? <FaHeart /> : <FaRegHeart />}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

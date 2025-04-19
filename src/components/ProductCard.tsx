import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { CartItem } from '../types/types';
import { Link } from 'react-router-dom';

interface ProductCardProps {
    productId: string;
    image: string;
    name: string;
    price: number;
    originalPrice: number;
    category: string;
    stock: number;
    handler: (cartItem: CartItem) => void;
    toggleHandler: (productId: string) => void;
    isWishlisted: boolean;
}

const ProductCard = ({
    productId,
    image,
    name,
    price,
    originalPrice,
    category,
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
            <Link to={`/product/${productId}`}>
                {stock < 10 && (
                    <span className={`stock-indicator ${stockStatus}`}>
                        {stock === 0 ? 'Sold Out' : `Only ${stock} left`}
                    </span>
                )}
                <img
                    src={image}
                    alt={name}
                />
                <p>{name}</p>
                <div className='price-category'>
                    <span className='product-price'>
                        ₹{price.toFixed(2)}{' '}
                        {originalPrice > price && (
                            <span className='original-price'>
                                <s>₹{originalPrice.toFixed(2)}</s>
                            </span>
                        )}
                    </span>
                    <span className='product-category'>{category}</span>
                </div>
            </Link>
            <div>
                <button
                    onClick={() =>
                        handler({
                            productId,
                            image,
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

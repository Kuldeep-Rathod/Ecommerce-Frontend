import { server } from '../redux/store';

interface ProductCardProps {
    productId: string;
    photo: string;
    name: string;
    price: number;
    stock: number;
    handler: () => void;
}

const ProductCard = ({
    productId,
    photo,
    name,
    price,
    stock,
    handler,
}: ProductCardProps) => {
    const stockStatus =
        stock === 0 ? 'out-of-stock' : stock < 10 ? 'low-stock' : 'in-stock';

    return (
        <div className='productCard'>
            {stock < 10 && (
                <span className={`stock-indicator ${stockStatus}`}>
                    {stock === 0 ? 'Sold Out' : `Only ${stock} left`}
                </span>
            )}
            <img
                src={`${server}/${photo}`}
                alt={name}
            />
            <p>{name}</p>
            <span>${price.toFixed(2)}</span>
            <button
                onClick={handler}
                disabled={stock === 0}
            >
                {stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
        </div>
    );
};

export default ProductCard;

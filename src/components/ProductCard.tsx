interface ProductCardProps {
    productId: string;
    photo: string;
    name: string;
    price: number;
    stock: number;
    handler: () => void;
}

const ProductCard = ({productId, photo, name, price, stock, handler }: ProductCardProps) => {
    return (
        <div className="productCard">
            <img src={photo} alt={name} />
            <p>{name}</p>
            <span>${price}</span    >
            <p>Stock: {stock}</p>
            <button onClick={handler}>Add to cart</button>
        </div>
    )
};

export default ProductCard;

import ProductCard from "../components/ProductCard";

const addToCartHandler = () => {
  alert("add to cart");
}

const OrderDetails = () => {
    return (
        <div>
            <ProductCard
                productId="1"
                name="Macbook"
                price={232223}
                stock={213}
                handler={() => {
                    addToCartHandler();
                }}
                photo="https://m.media-amazon.com/images/I/514T0SvwkHL._SL1500_.jpg"
            />
        </div>
    );
};

export default OrderDetails;

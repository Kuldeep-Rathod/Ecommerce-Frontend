import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Home = () => {
    const addToCartHandler = () => {
        console.log("add to cart");
    };

    return (
        <div className="home">
            <section></section>

            <h1>
                Latest Product
                <Link to="/search" className="findmore">
                    More
                </Link>
            </h1>

            <main>
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
            </main>
        </div>
    );
};

export default Home;

import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useLatestProductsQuery } from '../redux/api/productAPI';
import toast from 'react-hot-toast';
import ProductCardSkeleton from '../components/productSceleton';

const Home = () => {
    const { data, isLoading, isError } = useLatestProductsQuery('');

    const addToCartHandler = () => {
        console.log('add to cart');
    };

    if (isError) toast.error('Can not fetch products');

    return (
        <div className='home'>
            {/* Hero Section */}
            <section className='hero'>
                <div className='hero-content'>
                    <h2>Discover Amazing Products</h2>
                    <p>Shop the latest collection with exclusive deals</p>
                    <Link to='/search' className='shop-now-btn'>
                        Shop Now
                    </Link>
                </div>
            </section>

            {/* Featured Products */}
            <div className='featured-container'>
                <div className='section-header'>
                    <h1 className='section-title'>Latest Products</h1>
                    <Link to='/search' className='findmore'>
                        View All →
                    </Link>
                </div>

                <div className='products-grid'>
                    {isLoading
                        ? [...Array(4)].map((_, i) => (
                              <ProductCardSkeleton key={i} />
                          ))
                        : data?.products.map((product) => (
                              <ProductCard
                                  key={product._id}
                                  productId={product._id}
                                  name={product.name}
                                  price={product.price}
                                  stock={product.stock}
                                  handler={addToCartHandler}
                                  photo={product.photo}
                              />
                          ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
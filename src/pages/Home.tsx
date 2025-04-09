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
            <section></section>

            <h1>
                Latest Product
                <Link
                    to='/search'
                    className='findmore'
                >
                    More
                </Link>
            </h1>

            <main>
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
                              handler={() => {
                                  addToCartHandler();
                              }}
                              photo={product.photo}
                          />
                      ))}
            </main>
        </div>
    );
};

export default Home;

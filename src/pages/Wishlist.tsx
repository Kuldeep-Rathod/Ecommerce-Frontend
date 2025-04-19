import { useSelector } from 'react-redux';
import {
    useGetWishlistQuery,
    useToggleWishlistMutation,
} from '../redux/api/wishlistAPI';
import { RootState } from '../redux/store';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { addToCart } from '../redux/reducer/cartReducer';
import { useDispatch } from 'react-redux';
import { CartItem } from '../types/types';
import { responseToast } from '../utils/features';
import { Link } from 'react-router-dom';

const Wishlist = () => {
    const { user } = useSelector((state: RootState) => state.userReducer);

    const { data, isLoading, isError, error } = useGetWishlistQuery(
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        user?._id!,
        {
            skip: !user?._id,
        }
    );

    console.log(data?.items)

    const [toggleWishlist] = useToggleWishlistMutation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) toast.error('User not found');
        if (isError && error) {
            toast.error('Failed to fetch wishlist');
            console.log(error);
        }
    }, [user, isError, error]);

    const toggleHandler = async (productId: string) => {
        if (!user?._id) return toast.error('Please log in to toggle wishlist');
        const res = await toggleWishlist({ productId, userId: user._id });
        responseToast(res, null, '');
    };

    const addToCartHandler = (cartItem: CartItem) => {
        if (cartItem.stock < 1) return toast.error('Out of Stock');
        dispatch(addToCart(cartItem));
        toast.success('Added to cart');
    };

    if (!user) return null;
    if (isLoading)
        return <p className='wishlist-loading'>Loading wishlist...</p>;
    if (!data) return <p className='wishlist-error'>No wishlist data found.</p>;

    return (
        <div className='wishlist-page'>
            <h2 className='wishlist-page__title'>My Wishlist</h2>
            {data.items.length === 0 ? (
                <div className='empty-cart'>
                    <h2>Your wishlist is empty</h2>
                    <p>
                        Looks like you haven't added anything to your wishlist
                        yet
                    </p>
                    <Link
                        to='/'
                        className='continue-shopping'
                    >
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className='wishlist-products-grid'>
                    {data.items.map(({ product }) => (
                        <ProductCard
                            key={product._id}
                            productId={product._id}
                            name={product.name}
                            price={product.price}
                            originalPrice={product.originalPrice}
                            category={product.category}
                            stock={product.stock}
                            image={product.images[0]}
                            handler={addToCartHandler}
                            toggleHandler={toggleHandler}
                            isWishlisted={true} // All items here are wishlisted
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;

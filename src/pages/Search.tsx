import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import {
    useCategoriesQuery,
    useSearchProductsQuery,
} from '../redux/api/productAPI';
import { CustomError } from '../types/api-types';
import toast from 'react-hot-toast';
import ProductCardSkeleton from '../components/productSceleton';
import { CartItem } from '../types/types';
import { addToCart } from '../redux/reducer/cartReducer';
import { useDispatch, useSelector } from 'react-redux';
import {
    useGetWishlistQuery,
    useToggleWishlistMutation,
} from '../redux/api/wishlistAPI';
import { RootState } from '../redux/store';
import { responseToast } from '../utils/features';

const Search = () => {
    const { user } = useSelector((state: RootState) => state.userReducer);

    const {
        data: CategoriesResponse,
        isLoading: LoadingCategories,
        isError,
        error,
    } = useCategoriesQuery('');

    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const [maxPrice, setMaxPrice] = useState(100000);
    const [category, setCategory] = useState('');
    const [page, setPage] = useState(1);

    const {
        data: searchedData,
        isLoading: productLoading,
        isError: productIsError,
        error: productError,
    } = useSearchProductsQuery({
        category,
        page,
        search,
        sort,
        price: maxPrice,
    });

    const dispatch = useDispatch();

    const { data: wishlistData, isLoading: wishlistLoading } =
        useGetWishlistQuery(user?._id || '', {
            skip: !user?._id,
        });

    const [toggleWishlist] = useToggleWishlistMutation();

    const toggleHandler = async (productId: string) => {
        if (!user?._id) return toast.error('Please log in to add to wishlist');

        const res = await toggleWishlist({
            productId,
            userId: user._id,
        });

        responseToast(res, null, '');
    };

    const addToCartHandler = (cartItem: CartItem) => {
        if (cartItem.stock < 1) return toast.error('Out of Stock');
        dispatch(addToCart(cartItem));
        toast.success('Added to cart');
    };

    const isPrevPage = page > 1;
    const isNextPage = page < (searchedData?.totalPage || 1);

    if (isError) {
        toast.error((error as CustomError).data.message);
    }

    if (productIsError) {
        toast.error((productError as CustomError).data.message);
    }

    return (
        <div className='search-page'>
            <aside className='filters-sidebar'>
                <h2 className='filters-title'>Filters</h2>

                <div className='filter-group'>
                    <label>Sort By</label>
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className='filter-select'
                    >
                        <option value=''>Default</option>
                        <option value='asc'>Price (Low to High)</option>
                        <option value='dsc'>Price (High to Low)</option>
                    </select>
                </div>

                <div className='filter-group'>
                    <label>Max Price: ₹{maxPrice || ''}</label>
                    <input
                        type='range'
                        min={100}
                        max={10000}
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        className='price-slider'
                    />
                </div>

                <div className='filter-group'>
                    <label>Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className='filter-select'
                    >
                        <option value=''>All Categories</option>
                        {LoadingCategories === false
                            ? CategoriesResponse?.categories.map((i) => (
                                  <option
                                      key={i}
                                      value={i}
                                  >
                                      {i.toUpperCase()}
                                  </option>
                              ))
                            : 'loading'}
                    </select>
                </div>
            </aside>

            <main className='products-main'>
                <div className='search-header'>
                    <h1 className='page-title'>Products</h1>
                    <input
                        type='text'
                        placeholder='Search by name...'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='search-input'
                    />
                </div>

                <div className='product-grid'>
                    {productLoading
                        ? [...Array(6)].map((_, i) => (
                              <ProductCardSkeleton key={i} />
                          ))
                        : !wishlistLoading &&
                          searchedData?.products.map((product) => (
                              <ProductCard
                                  key={product._id}
                                  productId={product._id}
                                  name={product.name}
                                  price={product.price}
                                  originalPrice={product.originalPrice}
                                  category={product.category}
                                  stock={product.stock}
                                  handler={addToCartHandler}
                                  image={product.images[0]}
                                  toggleHandler={toggleHandler}
                                  isWishlisted={
                                      wishlistData?.items.some(
                                          (item) =>
                                              item.product._id === product._id
                                      ) || false
                                  }
                              />
                          ))}
                </div>

                {searchedData && searchedData?.totalPage > 1 && (
                    <div className='pagination'>
                        <button
                            className={`pagination-btn ${
                                !isPrevPage ? 'disabled' : ''
                            }`}
                            disabled={!isPrevPage}
                            onClick={() =>
                                isPrevPage && setPage((prev) => prev - 1)
                            }
                        >
                            Previous
                        </button>

                        <span className='page-indicator'>
                            Page {page} of {searchedData.totalPage}
                        </span>

                        <button
                            className={`pagination-btn ${
                                !isNextPage ? 'disabled' : ''
                            }`}
                            disabled={!isNextPage}
                            onClick={() =>
                                isNextPage && setPage((prev) => prev + 1)
                            }
                        >
                            Next
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Search;

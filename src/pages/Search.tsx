import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import {
    useCategoriesQuery,
    useSearchProductsQuery,
} from '../redux/api/productAPI';
import { CustomError } from '../types/api-types';
import toast from 'react-hot-toast';
import ProductCardSkeleton from '../components/productSceleton';

const Search = () => {
    const {
        data: CategoriesResponse,
        isLoading: LoadingCategories,
        isError,
        error,
    } = useCategoriesQuery('');

    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const [maxPrice, setMaxPrice] = useState(10000);
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

    const addToCartHandler = () => {
        alert('add to cart');
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
                    {productLoading ? (
                        [...Array(6)].map((_, i) => <ProductCardSkeleton key={i} />)
                    ) : (
                        searchedData?.products.map((product) => (
                            <ProductCard
                                key={product._id}
                                productId={product._id}
                                name={product.name}
                                price={product.price}
                                stock={product.stock}
                                handler={addToCartHandler}
                                photo={product.photo}
                            />
                        ))
                    )}
                </div>

                {searchedData && searchedData?.totalPage > 1 && (
                    <div className='pagination'>
                        <button
                            className={`pagination-btn ${!isPrevPage ? 'disabled' : ''}`}
                            disabled={!isPrevPage}
                            onClick={() => isPrevPage && setPage((prev) => prev - 1)}
                        >
                            Previous
                        </button>
                        
                        <span className='page-indicator'>
                            Page {page} of {searchedData.totalPage}
                        </span>
                        
                        <button
                            className={`pagination-btn ${!isNextPage ? 'disabled' : ''}`}
                            disabled={!isNextPage}
                            onClick={() => isNextPage && setPage((prev) => prev + 1)}
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
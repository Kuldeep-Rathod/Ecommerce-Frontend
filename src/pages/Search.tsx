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
        <div className='productSearchPage'>
            <aside>
                <h2>Filters</h2>
                <div>
                    <h4>Sort</h4>
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value=''>None</option>
                        <option value='asc'>Price (Low to High)</option>
                        <option value='dsc'>Price (High to Low)</option>
                    </select>
                </div>

                <div>
                    <h4>Max Price: {maxPrice || ''}</h4>
                    <input
                        type='range'
                        min={100}
                        max={100000}
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                    />
                </div>

                <div>
                    <h4>Category</h4>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value=''>ALL</option>
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
            <main>
                <h1>Products</h1>
                <input
                    type='text'
                    placeholder='Search by name...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {productLoading ? (
                    <div className='searchProductList'>
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                    </div>
                ) : (
                    <div className='searchProductList'>
                        {searchedData?.products.map((product) => (
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
                    </div>
                )}

                {searchedData && searchedData?.totalPage > 1 && (
                    <article>
                        <button
                            disabled={!isPrevPage}
                            onClick={() => {
                                if (isPrevPage) setPage((prev) => prev - 1);
                            }}
                        >
                            Prev
                        </button>

                        <span>
                            {page} of {searchedData.totalPage}
                        </span>

                        <button
                            disabled={!isNextPage}
                            onClick={() => {
                                if (isNextPage) setPage((prev) => prev + 1);
                            }}
                        >
                            Next
                        </button>
                    </article>
                )}
            </main>
        </div>
    );
};

export default Search;

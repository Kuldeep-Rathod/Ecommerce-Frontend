import { useState } from "react";
import ProductCard from "../components/ProductCard";

const Search = () => {
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [maxPrice, setMaxPrice] = useState(100000);
    const [category, setCategory] = useState("");
    const [page, setPage] = useState(1);

    const addToCartHandler = () => {
        alert("add to cart");
    };

    const isNextPage = true;
    const isPrevPage = true;

    return (
        <div className="productSearchPage">
            <aside>
                <h2>Filters</h2>
                <div>
                    <h4>Sort</h4>
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value="">None</option>
                        <option value="asc">Price (Low to High)</option>
                        <option value="dsc">Price (High to Low)</option>
                    </select>
                </div>

                <div>
                    <h4>Max Price: {maxPrice || ""}</h4>
                    <input
                        type="range"
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
                        <option value="">None</option>
                        <option value="">Sample 1</option>
                        <option value="">Sample 2</option>
                    </select>
                </div>
            </aside>
            <main>
                <h1>Products</h1>
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="searchProductList">
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

                <article>
                    <button
                        disabled={!isPrevPage}
                        onClick={() => setPage((prev) => prev - 1)}
                    >
                        Prev
                    </button>
                    <span>
                        {page} of {10}
                    </span>
                    <button
                        disabled={!isNextPage}
                        onClick={() => setPage((prev) => prev + 1)}
                    >
                        Next
                    </button>
                </article>
            </main>
        </div>
    );
};

export default Search;

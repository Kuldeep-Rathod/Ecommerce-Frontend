import ProductCardSkeleton from '../components/productSceleton';

const HomeSkeleton = () => {
    return (
        <div className='home-skeleton'>
            {/* Hero Section Skeleton */}
            <section className='hero-skeleton'>
                <div className='hero-content-skeleton'></div>
            </section>

            {/* Heading Skeleton */}
            <div className='heading-skeleton'>
                <div className='title-skeleton'></div>
                <div className='findmore-skeleton'></div>
            </div>

            {/* Products Grid Skeleton */}
            <main className='products-grid-skeleton'>
                {[...Array(4)].map((_, i) => (
                    <ProductCardSkeleton key={i} />
                ))}
            </main>
        </div>
    );
};

export default HomeSkeleton;

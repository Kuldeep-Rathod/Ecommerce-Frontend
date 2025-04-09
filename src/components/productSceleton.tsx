interface ProductCardSkeletonProps {
    hideButton?: boolean;
}

const ProductCardSkeleton = ({
    hideButton = false,
}: ProductCardSkeletonProps) => {
    return (
        <div className='productCardSkeleton'>
            <div className='image-placeholder'></div>
            <div className='text-placeholder'></div>
            <div className='price-placeholder'></div>
            {!hideButton && <div className='button-placeholder'></div>}
        </div>
    );
};

export default ProductCardSkeleton;

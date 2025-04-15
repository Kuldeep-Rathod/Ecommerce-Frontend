// TableSkeleton.tsx
const TableSkeleton = () => {
    return (
        <div className='table-skeleton-container'>
            {/* Table Header */}
            <div className='table-skeleton-header'>
                {[...Array(5)].map((_, i) => (
                    <div
                        key={`header-${i}`}
                        className='table-skeleton-header-cell'
                    />
                ))}
            </div>

            {/* Table Rows */}
            {[...Array(5)].map((_, i) => (
                <div
                    key={`row-${i}`}
                    className='table-skeleton-row'
                >
                    <div className='table-skeleton-cell table-skeleton-image' />
                    <div className='table-skeleton-cell' />
                    <div className='table-skeleton-cell' />
                    <div className='table-skeleton-cell' />
                    <div className='table-skeleton-cell table-skeleton-action' />
                </div>
            ))}
        </div>
    );
};

export default TableSkeleton;

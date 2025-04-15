import AdminSidebar from '../AdminSidebar';

// ChartsSkeleton.tsx
const ChartsSkeleton = () => {
    return (
        <div className='adminContainer'>
            <AdminSidebar />
            <div className='charts-skeleton-container'>
                <div className='charts-skeleton-header'>
                    <div className='charts-skeleton-title'></div>
                </div>

                <div className='charts-skeleton-grid'>
                    {/* Main Chart */}
                    <div className='charts-skeleton-main'>
                        <div className='charts-skeleton-chart'></div>
                    </div>

                    {/* Side Charts */}
                    <div className='charts-skeleton-side'>
                        <div className='charts-skeleton-mini-chart'></div>
                        <div className='charts-skeleton-mini-chart'></div>
                    </div>
                </div>

                {/* Bottom Charts */}
                <div className='charts-skeleton-bottom'>
                    <div className='charts-skeleton-wide-chart'></div>
                    <div className='charts-skeleton-wide-chart'></div>
                </div>
            </div>
        </div>
    );
};

export default ChartsSkeleton;

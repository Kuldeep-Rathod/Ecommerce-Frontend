// DashboardSkeleton.tsx

import AdminSidebar from '../AdminSidebar';

const DashboardSkeleton = () => {
    return (
        <div className='adminContainer'>
            <AdminSidebar />
            <main className='dashboard-skeleton'>
                {/* Header */}
                <div className='skeleton-bar'>
                    <div className='skeleton-searchbar'></div>
                    <div className='skeleton-userbadge'></div>
                </div>

                {/* Widgets */}
                <section className='skeleton-widget-grid'>
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className='skeleton-widget-card'
                        ></div>
                    ))}
                </section>

                {/* Charts */}
                <section className='skeleton-chart-area'>
                    <div className='skeleton-barchart-container'></div>
                    <div className='skeleton-inventory-container'></div>
                </section>
            </main>
        </div>
    );
};

export default DashboardSkeleton;

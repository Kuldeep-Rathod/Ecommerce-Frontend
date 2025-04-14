import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import { DoughnutChart, PieChart } from '../../../components/admin/Charts';
import { usePieQuery } from '../../../redux/api/dashboardAPI';
import { RootState } from '../../../redux/store';
import { CustomError } from '../../../types/api-types';

const PieCharts = () => {
    const { user } = useSelector((state: RootState) => state.userReducer);
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    const { data, isError, error, isLoading } = usePieQuery(user?._id!);

    const pieCharts = data?.pieCharts;

    useEffect(() => {
        if (isError && error) {
            const err = error as CustomError;
            toast.error(err?.data?.message || 'Something went wrong');
        }
    }, [isError, error]);

    if (isLoading) return <div>Loading Pie Charts...</div>;
    if (!pieCharts) return toast.error('Error to fetch Charts');

    const categoryRatio = pieCharts.productCategories.map((category) => {
        const [label, value] = Object.entries(category)[0];
        return { label, value };
    });

    return (
        <div className='adminContainer'>
            <AdminSidebar />
            <main className='pieChartContainer'>
                <h1>Pie & Doughnut Charts</h1>
                <section>
                    <div>
                        <PieChart
                            labels={['Processing', 'Shipped', 'Delivered']}
                            data={[
                                pieCharts.orderFullfillment.processing,
                                pieCharts.orderFullfillment.shipped,
                                pieCharts.orderFullfillment.delivered,
                            ]}
                            backgroundColor={[
                                `hsl(110,80%, 80%)`,
                                `hsl(110,80%, 50%)`,
                                `hsl(110,40%, 50%)`,
                            ]}
                            offset={[0, 0, 50]}
                        />
                    </div>
                    <h2>Order Fulfillment Ratio</h2>
                </section>
                <section>
                    <div>
                        <DoughnutChart
                            labels={categoryRatio.map((i) => i.label)}
                            data={categoryRatio.map((i) => i.value)}
                            backgroundColor={categoryRatio.map(
                                (_, index) =>
                                    `hsl(${
                                        ((index * 360) / categoryRatio.length) %
                                        360
                                    }, 70%, 65%)`
                            )}
                            legends={false}
                            offset={[0, 0, 70]}
                        />
                    </div>
                    <h2>Product Categories Ratio</h2>
                </section>

                <section>
                    <div>
                        <DoughnutChart
                            labels={['In Stock', 'Out of Stock']}
                            data={[
                                pieCharts.stockAvailability.inStock,
                                pieCharts.stockAvailability.outOfStock,
                            ]}
                            backgroundColor={[
                                'hsl(269, 80%, 50%)',
                                'rgb(53,162,255)',
                            ]}
                            legends={false}
                            offset={[0, 70]}
                            cutout={'60%'}
                        />
                    </div>
                    <h2>Stock Availability</h2>
                </section>

                <section>
                    <div>
                        <DoughnutChart
                            labels={[
                                'Marketing Cost',
                                'Discount',
                                'Burnt',
                                'Production Cost',
                                'Net Margin',
                            ]}
                            data={[
                                pieCharts.revenueDistribution.marketingCost,
                                pieCharts.revenueDistribution.discount,
                                pieCharts.revenueDistribution.burnt,
                                pieCharts.revenueDistribution.productionCost,
                                pieCharts.revenueDistribution.netMargin,
                            ]}
                            backgroundColor={[
                                'hsl(110,80%,40%)',
                                'hsl(19,80%,40%)',
                                'hsl(69,80%,40%)',
                                'hsl(300,80%,40%)',
                                'rgb(53, 162, 255)',
                            ]}
                            legends={false}
                            offset={[20, 30, 20, 30, 80]}
                        />
                    </div>
                    <h2>Revenue Distribution</h2>
                </section>

                <section>
                    <div>
                        <PieChart
                            labels={[
                                'Teenager(Below 20)',
                                'Adult (20-40)',
                                'Older (above 40)',
                            ]}
                            data={[
                                pieCharts.usersAgeGroup.teen,
                                pieCharts.usersAgeGroup.adult,
                                pieCharts.usersAgeGroup.senior,
                            ]}
                            backgroundColor={[
                                `hsl(10, ${80}%, 80%)`,
                                `hsl(10, ${80}%, 50%)`,
                                `hsl(10, ${40}%, 50%)`,
                            ]}
                            offset={[0, 0, 50]}
                        />
                    </div>
                    <h2>Users Age Group</h2>
                </section>

                <section>
                    <div>
                        <DoughnutChart
                            labels={['Admin', 'Customers']}
                            data={[
                                pieCharts.adminCustomers.admin,
                                pieCharts.adminCustomers.customer,
                            ]}
                            backgroundColor={[
                                `hsl(335, 100%, 38%)`,
                                'hsl(44, 98%, 50%)',
                            ]}
                            offset={[0, 40]}
                        />
                    </div>
                </section>
            </main>
        </div>
    );
};

export default PieCharts;

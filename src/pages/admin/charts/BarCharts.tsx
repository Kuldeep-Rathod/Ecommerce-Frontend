import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import { BarChart } from '../../../components/admin/Charts';
import { useBarQuery } from '../../../redux/api/dashboardAPI';
import { RootState } from '../../../redux/store';
import { CustomError } from '../../../types/api-types';
import ChartsSkeleton from '../../../components/admin/skeleton/ChartsSkeleton';

const BarCharts = () => {
    const { user } = useSelector((state: RootState) => state.userReducer);
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    const { data, isError, error, isLoading } = useBarQuery(user?._id!);

    const barCharts = data?.barCharts;
    const products = barCharts?.products || [];
    const users = barCharts?.users || [];
    const orders = barCharts?.orders || [];

    if (isError && error) {
        const err = error as CustomError;
        toast.error(err?.data?.message || 'Something went wrong');
        return <Navigate to={'/admin/dashboard'} />;
    }

    if (isLoading) return <ChartsSkeleton />;
    if (!barCharts) return toast.error('Error to fetch Charts');

    return (
        <div className='adminContainer'>
            <AdminSidebar />
            <main className='chartContainer'>
                <h1>Bar Charts</h1>
                <section>
                    <BarChart
                        data_1={products}
                        data_2={users}
                        title_1='Products'
                        title_2='Users'
                        bgColor_1={`hsl(260,50%,30%)`}
                        bgColor_2={`hsl(360,90%,90%)`}
                        labels={barCharts.sixMonths}
                    />
                    <h2>Top Selling Products & Top Customers</h2>
                </section>
                <section>
                    <BarChart
                        horizontal={true}
                        data_1={orders}
                        data_2={[]}
                        title_1='Orders'
                        title_2=''
                        bgColor_1={`hsl(240, 50%, 40%)`}
                        bgColor_2=''
                        labels={barCharts.twelveMonths}
                    />
                    <h2>Orders throughout the year</h2>
                </section>
            </main>
        </div>
    );
};

export default BarCharts;

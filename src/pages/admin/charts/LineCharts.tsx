import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import { LineChart } from '../../../components/admin/Charts';
import { useLineQuery } from '../../../redux/api/dashboardAPI';
import { RootState } from '../../../redux/store';
import { CustomError } from '../../../types/api-types';
import ChartsSkeleton from '../../../components/admin/skeleton/ChartsSkeleton';

const LineCharts = () => {
    const { user } = useSelector((state: RootState) => state.userReducer);
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    const { data, isError, error, isLoading } = useLineQuery(user?._id!);

    const lineCharts = data?.lineCharts;
    const products = lineCharts?.products || [];
    const discount = lineCharts?.discount || [];
    const revenue = lineCharts?.revenue || [];
    const users = lineCharts?.users || [];

    if (isError && error) {
        const err = error as CustomError;
        toast.error(err?.data?.message || 'Something went wrong');
        return <Navigate to={'/admin/dashboard'} />;
    }

    if (isLoading) return <ChartsSkeleton />;
    if (!lineCharts) return toast.error('Error to fetch Charts');

    return (
        <div className='adminContainer'>
            <AdminSidebar />
            <main className='chartContainer'>
                <h1>Line Charts</h1>
                <section>
                    <LineChart
                        data={users}
                        label='Users'
                        backgroundColor='hsl(240, 80%, 75%)'
                        borderColor='hsl(240, 80%, 55%)'
                        labels={lineCharts.twelveMonths}
                    />
                    <h2>Active Users</h2>
                </section>
                <section>
                    <LineChart
                        data={products}
                        backgroundColor={'hsla(269,80%,40%,0.4)'}
                        borderColor={'hsl(269,80%,40%)'}
                        label='Products'
                        labels={lineCharts.twelveMonths}
                    />
                    <h2>Total Products (SKU)</h2>
                </section>

                <section>
                    <LineChart
                        data={revenue}
                        backgroundColor={'hsla(129,80%,40%,0.4)'}
                        borderColor={'hsl(129,80%,40%)'}
                        label='Revenue'
                        labels={lineCharts.twelveMonths}
                    />
                    <h2>Total Revenue</h2>
                </section>

                <section>
                    <LineChart
                        data={discount}
                        backgroundColor={'hsla(29,80%,40%,0.4)'}
                        borderColor={'hsl(29,80%,40%)'}
                        label='Discount'
                        labels={lineCharts.twelveMonths}
                    />
                    <h2>Discount Allotted</h2>
                </section>
            </main>
        </div>
    );
};

export default LineCharts;

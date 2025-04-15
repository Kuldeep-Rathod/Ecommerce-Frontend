import { useSelector } from 'react-redux';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import { LineChart } from '../../../components/admin/Charts';
import { RootState } from '../../../redux/store';
import { useLineQuery } from '../../../redux/api/dashboardAPI';
import { useEffect } from 'react';
import { CustomError } from '../../../types/api-types';
import toast from 'react-hot-toast';

const LineCharts = () => {
    const { user } = useSelector((state: RootState) => state.userReducer);
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    const { data, isError, error, isLoading } = useLineQuery(user?._id!);

    const lineCharts = data?.lineCharts;

    useEffect(() => {
        if (isError && error) {
            const err = error as CustomError;
            toast.error(err?.data?.message || 'Something went wrong');
        }
    }, [isError, error]);

    if (isLoading) return <div>Loading Line Charts...</div>;
    if (!lineCharts) return toast.error('Error to fetch Charts');

    return (
        <div className='adminContainer'>
            <AdminSidebar />
            <main className='chartContainer'>
                <h1>Line Charts</h1>
                <section>
                    <LineChart
                        data={lineCharts.users}
                        label='Users'
                        backgroundColor='hsl(240, 80%, 75%)'
                        borderColor='hsl(240, 80%, 55%)'
                        labels={lineCharts.twelveMonths}
                    />
                    <h2>Active Users</h2>
                </section>
                <section>
                    <LineChart
                        data={lineCharts.products}
                        backgroundColor={'hsla(269,80%,40%,0.4)'}
                        borderColor={'hsl(269,80%,40%)'}
                        label='Products'
                        labels={lineCharts.twelveMonths}
                    />
                    <h2>Total Products (SKU)</h2>
                </section>

                <section>
                    <LineChart
                        data={lineCharts.revenue}
                        backgroundColor={'hsla(129,80%,40%,0.4)'}
                        borderColor={'hsl(129,80%,40%)'}
                        label='Revenue'
                        labels={lineCharts.twelveMonths}
                    />
                    <h2>Total Revenue</h2>
                </section>

                <section>
                    <LineChart
                        data={lineCharts.discount}
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

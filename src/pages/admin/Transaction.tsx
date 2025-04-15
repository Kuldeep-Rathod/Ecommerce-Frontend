import { ReactElement, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Column } from 'react-table';
import AdminSidebar from '../../components/admin/AdminSidebar';
import TableHOC from '../../components/admin/TableHOC';
import { useAllOrdersQuery } from '../../redux/api/orderAPI';
import { RootState } from '../../redux/store';
import { CustomError } from '../../types/api-types';
import TableSkeleton from '../../components/admin/skeleton/TableSkeleton';

interface DataType {
    user: string;
    amount: number;
    discount: number;
    quantity: number;
    status: ReactElement;
    action: ReactElement;
}

const columns: Column<DataType>[] = [
    {
        Header: 'User',
        accessor: 'user',
    },
    {
        Header: 'Amount',
        accessor: 'amount',
    },
    {
        Header: 'Discount',
        accessor: 'discount',
    },
    {
        Header: 'Quantity',
        accessor: 'quantity',
    },
    {
        Header: 'Status',
        accessor: 'status',
    },
    {
        Header: 'Action',
        accessor: 'action',
    },
];

const Transaction = () => {
    const { user } = useSelector((state: RootState) => state.userReducer);
    //Shorter version of this
    // const { user } = useSelector(
    //     (state: { userReducer: UserReducerInitialState }) => state.userReducer
    // );

    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    const { isLoading, isError, error, data } = useAllOrdersQuery(user?._id!);

    const [rows, setRows] = useState<DataType[]>([]);

    if (isError) {
        toast.error((error as CustomError).data.message);
    }

    useEffect(() => {
        if (data) {
            setRows(
                data.orders.map((i) => ({
                    user: i.user.name,
                    amount: i.total,
                    discount: i.discount,
                    quantity: i.orderItems.length,
                    status: (
                        <span
                            className={
                                i.status === 'Processing'
                                    ? 'red'
                                    : i.status === 'Shipped'
                                    ? 'green'
                                    : 'purple'
                            }
                        >
                            {i.status}
                        </span>
                    ),
                    action: (
                        <Link to={`/admin/transaction/${i._id}`}>Manage</Link>
                    ),
                }))
            );
        }
    }, [data]);

    const Table = TableHOC<DataType>(
        columns,
        rows,
        'dashboardProductBox',
        'Transactions',
        rows.length > 5
    )();

    return (
        <div className='adminContainer'>
            <AdminSidebar />
            <main>
                {isLoading ? (
                    <TableSkeleton />
                ) : (
                    <div className='customerPageContainer'>{Table}</div>
                )}
            </main>
        </div>
    );
};

export default Transaction;

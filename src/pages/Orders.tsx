import { ReactElement, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Column } from 'react-table';
import TableSkeleton from '../components/admin/skeleton/TableSkeleton';
import TableHOC from '../components/admin/TableHOC';
import { useMyOrdersQuery } from '../redux/api/orderAPI';
import { CustomError } from '../types/api-types';
import { UserReducerInitialState } from '../types/reducer-types';

type DataType = {
    _id: string;
    amount: number;
    quantity: number;
    discount: number;
    status: ReactElement;
    action: ReactElement;
};

const columns: Column<DataType>[] = [
    {
        Header: 'Id',
        accessor: '_id',
    },
    {
        Header: 'Amount',
        accessor: 'amount',
    },
    {
        Header: 'Quantity',
        accessor: 'quantity',
    },
    {
        Header: 'Discount',
        accessor: 'discount',
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

const Orders = () => {
    const { user } = useSelector(
        (state: { userReducer: UserReducerInitialState }) => state.userReducer
    );

    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    const { isLoading, isError, error, data } = useMyOrdersQuery(user?._id!);

    const [rows, setRows] = useState<DataType[]>([]);

    if (isError) {
        toast.error((error as CustomError).data.message);
    }

    useEffect(() => {
        if (data) {
            setRows(
                data.orders.map((i) => ({
                    _id: i._id,
                    amount: i.total,
                    quantity: i.orderItems.length,
                    discount: i.discount,
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
                    action: <Link to={`/orders/${i._id}`}>View</Link>,
                }))
            );
        }
    }, [data]);

    const Table = TableHOC<DataType>(
        columns,
        rows,
        'dashboardProductBox',
        'Orders',
        rows.length > 5
    );

    return (
        <div className='container'>
            <h1>My Orders</h1>

            {isLoading ? <TableSkeleton /> : <Table />}
        </div>
    );
};

export default Orders;

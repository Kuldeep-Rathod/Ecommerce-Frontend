import { ReactElement, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaPlus } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Column } from 'react-table';
import AdminSidebar from '../../components/admin/AdminSidebar';
import TableSkeleton from '../../components/admin/skeleton/TableSkeleton';
import TableHOC from '../../components/admin/TableHOC';
import { useAllProductsQuery } from '../../redux/api/productAPI';
import { CustomError } from '../../types/api-types';
import { UserReducerInitialState } from '../../types/reducer-types';

interface DataType {
    photo: ReactElement;
    name: string;
    price: number;
    stock: number;
    action: ReactElement;
}

const columns: Column<DataType>[] = [
    {
        Header: 'Photo',
        accessor: 'photo',
    },
    {
        Header: 'Name',
        accessor: 'name',
    },
    {
        Header: 'Price',
        accessor: 'price',
    },
    {
        Header: 'Stock',
        accessor: 'stock',
    },
    {
        Header: 'Action',
        accessor: 'action',
    },
];

const Products = () => {
    const { user } = useSelector(
        (state: { userReducer: UserReducerInitialState }) => state.userReducer
    );

    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    const { isLoading, isError, error, data } = useAllProductsQuery(user?._id!);

    const [rows, setRows] = useState<DataType[]>([]);

    if (isError) {
        toast.error((error as CustomError).data.message);
    }

    useEffect(() => {
        if (data) {
            setRows(
                data.products.map((i) => ({
                    photo: <img src={i.photo} />,
                    name: i.name,
                    price: i.price,
                    stock: i.stock,
                    action: <Link to={`/admin/product/${i._id}`}>Manage</Link>,
                }))
            );
        }
    }, [data]);

    const Table = TableHOC<DataType>(
        columns,
        rows,
        'dashboardProductBox',
        'Product',
        rows.length > 5
    )();

    return (
        <div className='adminContainer'>
            <AdminSidebar />
            <main className='productPage'>
                {isLoading ? <TableSkeleton /> : Table}
                <Link
                    to='/admin/product/new'
                    className='createProductBtn'
                >
                    <FaPlus />
                </Link>
            </main>
        </div>
    );
};

export default Products;

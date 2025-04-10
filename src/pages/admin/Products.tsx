import { ReactElement, useEffect, useState } from 'react';
import { Column } from 'react-table';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa6';
import TableHOC from '../../components/admin/TableHOC';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { useAllProductsQuery } from '../../redux/api/productAPI';
import { server } from '../../redux/store';
import toast from 'react-hot-toast';
import { CustomError } from '../../types/api-types';
import { useSelector } from 'react-redux';
import { UserReducerInitialState } from '../../types/reducer-types';
import Loading from '../../components/Loading';

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

    if (isError) toast.error((error as CustomError).data.message);

    useEffect(() => {
        if (data) {
            setRows(
                data.products.map((i) => ({
                    photo: <img src={`${server}/${i.photo}`} />,
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
                {isLoading ? <Loading /> : Table}
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

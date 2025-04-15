import { ReactElement, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { Column } from 'react-table';
import AdminSidebar from '../../components/admin/AdminSidebar';
import TableHOC from '../../components/admin/TableHOC';
import {
    useAllUsersQuery,
    useDeleteUserMutation,
} from '../../redux/api/userAPI';
import { RootState } from '../../redux/store';
import { CustomError } from '../../types/api-types';
import { responseToast } from '../../utils/features';
import TableSkeleton from '../../components/admin/skeleton/TableSkeleton';

interface DataType {
    avatar: ReactElement;
    name: string;
    email: string;
    gender: string;
    role: string;
    action: ReactElement;
}

const columns: Column<DataType>[] = [
    {
        Header: 'Avatar',
        accessor: 'avatar',
    },
    {
        Header: 'Name',
        accessor: 'name',
    },
    {
        Header: 'Email',
        accessor: 'email',
    },
    {
        Header: 'Gender',
        accessor: 'gender',
    },
    {
        Header: 'Action',
        accessor: 'action',
    },
];

const Customers = () => {
    const { user } = useSelector((state: RootState) => state.userReducer);

    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    const { isLoading, isError, error, data } = useAllUsersQuery(user?._id!);

    const [rows, setRows] = useState<DataType[]>([]);

    const [deleteUser] = useDeleteUserMutation();

    const deleteHandler = async (userId: string) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        const res = await deleteUser({ userId, adminUserId: user?._id! });
        responseToast(res, null, '');
    };

    if (isError) {
        toast.error((error as CustomError).data.message);
    }

    useEffect(() => {
        if (data) {
            setRows(
                data.users.map((i) => ({
                    avatar: (
                        <img
                            style={{ borderRadius: '50%' }}
                            alt={i.name}
                            src={`${i.photo}`}
                        />
                    ),
                    email: i.email,
                    gender: i.gender,
                    name: i.name,
                    role: i.role,
                    action: (
                        <button onClick={() => deleteHandler(i._id)}>
                            <FaTrash />
                        </button>
                    ),
                }))
            );
        }
    }, [data]);

    const CustomersTable = ({ rows }: { rows: DataType[] }) => {
        const Table = TableHOC<DataType>(
            columns,
            rows,
            'dashboardProductBox',
            'Customers',
            rows.length > 5
        );
        return <div className='customerPageContainer'>{Table()}</div>;
    };

    return (
        <div className='adminContainer'>
            <>
                <AdminSidebar />
                <main>
                    {isLoading ? (
                        <TableSkeleton />
                    ) : (
                        <CustomersTable rows={rows} />
                    )}
                </main>
            </>
        </div>
    );
};

export default Customers;

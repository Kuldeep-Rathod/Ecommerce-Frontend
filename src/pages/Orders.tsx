import { ReactElement, useState } from "react";
import { Column } from "react-table";
import TableHOC from "../components/admin/TableHOC";
import { Link } from "react-router-dom";

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
        Header: "Id",
        accessor: "_id",
    },
    {
        Header: "Amount",
        accessor: "amount",
    },
    {
        Header: "Quantity",
        accessor: "quantity",
    },
    {
        Header: "Discount",
        accessor: "discount",
    },
    {
        Header: "Status",
        accessor: "status",
    },
    {
        Header: "Action",
        accessor: "action",
    },
];

const Orders = () => {
    const [rows] = useState<DataType[]>([
        {
            _id: "1",
            amount: 2000,
            quantity: 2,
            discount: 400,
            status: <span className="green">Delivered</span>,
            action: <Link to="/orders/1">View</Link>,
        },
    ]);

    const Table = TableHOC<DataType>(
        columns,
        rows,
        "dashboardProductBox",
        "Orders",
        rows.length > 5
    );

    return (
        <div className="container">
            <h1>My Orders</h1>

            <Table />
        </div>
    );
};

export default Orders;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "./components/Loading";
import Header from "./components/Header";
import Shipping from "./pages/Shipping";

const Home = lazy(() => import("./pages/Home"));
const Cart = lazy(() => import("./pages/Cart"));
const Search = lazy(() => import("./pages/Search"));

//Admin Routes Importing
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Customers = lazy(() => import("./pages/admin/Customers"));
const Transaction = lazy(() => import("./pages/admin/Transaction"));
const Products = lazy(() => import("./pages/admin/Products"));
const NewProduct = lazy(() => import("./pages/admin/management/NewProduct"));
const ProductManagement = lazy(
    () => import("./pages/admin/management/ProductManagement")
);
const TransactionManagement = lazy(
    () => import("./pages/admin/management/TransactionManagement")
);
const BarCharts = lazy(() => import("./pages/admin/charts/BarCharts"));
const PieCharts = lazy(() => import("./pages/admin/charts/PieCharts"));
const LineCharts = lazy(() => import("./pages/admin/charts/LineCharts"));
const Stopwatch = lazy(() => import("./pages/admin/apps/Stopwatch"));
const Coupon = lazy(() => import("./pages/admin/apps/Coupon"));
const Toss = lazy(() => import("./pages/admin/apps/Toss"));

const App = () => {
    return (
        <Router>
            {/* Header */}
            <Header />

            <Suspense fallback={<Loading />}>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/search" element={<Search />} />

                    {/* Loggedin User Routes */}
                    <Route>
                        <Route path="/shipping" element={<Shipping />} />
                    </Route>

                    {/* Admin Routes */}
                    <Route>
                        <Route
                            path="/admin/dashboard"
                            element={<Dashboard />}
                        />
                        <Route
                            path="/admin/customers"
                            element={<Customers />}
                        />
                        <Route path="/admin/products" element={<Products />} />
                        <Route
                            path="/admin/transaction"
                            element={<Transaction />}
                        />
                        {/* Charts */}
                        <Route
                            path="/admin/chart/bar"
                            element={<BarCharts />}
                        />
                        <Route
                            path="/admin/chart/pie"
                            element={<PieCharts />}
                        />
                        <Route
                            path="/admin/chart/line"
                            element={<LineCharts />}
                        />

                        {/* Apps */}
                        <Route
                            path="/admin/app/stopwatch"
                            element={<Stopwatch />}
                        />
                        <Route path="/admin/app/coupon" element={<Coupon />} />
                        <Route path="/admin/app/toss" element={<Toss />} />

                        {/* Management */}
                        <Route
                            path="/admin/products/new"
                            element={<NewProduct />}
                        />
                        <Route
                            path="/admin/products/:id"
                            element={<ProductManagement />}
                        />
                        <Route
                            path="/admin/transaction/:id"
                            element={<TransactionManagement />}
                        />
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    );
};

export default App;

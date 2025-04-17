// AppRoutes.tsx
import { Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loading from './components/Loading';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import AboutUs from './pages/AboutUs';
import Wishlist from './pages/Wishlist';
import { User } from './types/types';

const Login = lazy(() => import('./pages/Login'));
const Home = lazy(() => import('./pages/Home'));
const Cart = lazy(() => import('./pages/Cart'));
const Search = lazy(() => import('./pages/Search'));
const Shipping = lazy(() => import('./pages/Shipping'));
const Orders = lazy(() => import('./pages/Orders'));
const OrderDetails = lazy(() => import('./pages/OrderDetails'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const Checkout = lazy(() => import('./pages/Checkout'));
const MyAccount = lazy(() => import('./pages/MyAccount'));

//Admin Routes Importing
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const Customers = lazy(() => import('./pages/admin/Customers'));
const Transaction = lazy(() => import('./pages/admin/Transaction'));
const Products = lazy(() => import('./pages/admin/Products'));
const NewProduct = lazy(() => import('./pages/admin/management/NewProduct'));
const ProductManagement = lazy(
    () => import('./pages/admin/management/ProductManagement')
);
const TransactionManagement = lazy(
    () => import('./pages/admin/management/TransactionManagement')
);
const BarCharts = lazy(() => import('./pages/admin/charts/BarCharts'));
const PieCharts = lazy(() => import('./pages/admin/charts/PieCharts'));
const LineCharts = lazy(() => import('./pages/admin/charts/LineCharts'));
const Stopwatch = lazy(() => import('./pages/admin/apps/Stopwatch'));
const Coupon = lazy(() => import('./pages/admin/apps/Coupon'));
const Toss = lazy(() => import('./pages/admin/apps/Toss'));

const AppRoutes = ({ user }: { user: User | null }) => {
    const location = useLocation();
    const hideHeader = location.pathname.startsWith('/admin');

    return (
        <>
            {/* Header */}

            {!hideHeader && <Header user={user} />}

            <Suspense fallback={<Loading />}>
                <Routes>
                    {/* Public Routes */}
                    <Route
                        path='/'
                        element={<Home />}
                    />
                    <Route
                        path='/cart'
                        element={<Cart />}
                    />
                    <Route
                        path='/search'
                        element={<Search />}
                    />
                    <Route
                        path='/about'
                        element={<AboutUs />}
                    />

                    {/* Not logged In Route */}
                    <Route
                        path='/login'
                        element={
                            <ProtectedRoute
                                isAuthenticated={user ? false : true}
                            >
                                <Login />
                            </ProtectedRoute>
                        }
                    />

                    {/* Loggedin User Routes */}
                    <Route
                        element={
                            <ProtectedRoute
                                isAuthenticated={user ? true : false}
                            />
                        }
                    >
                        <Route
                            path='/account'
                            element={<MyAccount />}
                        />
                        <Route
                            path='/wishlist'
                            element={<Wishlist />}
                        />
                        <Route
                            path='/shipping'
                            element={<Shipping />}
                        />
                        <Route
                            path='/pay'
                            element={<Checkout />}
                        />
                        <Route
                            path='/orders'
                            element={<Orders />}
                        />
                        <Route
                            path='/orders/:id'
                            element={<OrderDetails />}
                        />
                    </Route>

                    {/* Admin Routes */}
                    <Route
                        element={
                            <ProtectedRoute
                                isAuthenticated={user ? true : false}
                                adminRoute={true}
                                isAdmin={user?.role === 'admin' ? true : false}
                            />
                        }
                    >
                        <Route
                            path='/admin/dashboard'
                            element={<Dashboard />}
                        />
                        <Route
                            path='/admin/customers'
                            element={<Customers />}
                        />
                        <Route
                            path='/admin/products'
                            element={<Products />}
                        />
                        <Route
                            path='/admin/transaction'
                            element={<Transaction />}
                        />
                        {/* Charts */}
                        <Route
                            path='/admin/chart/bar'
                            element={<BarCharts />}
                        />
                        <Route
                            path='/admin/chart/pie'
                            element={<PieCharts />}
                        />
                        <Route
                            path='/admin/chart/line'
                            element={<LineCharts />}
                        />

                        {/* Apps */}
                        <Route
                            path='/admin/app/stopwatch'
                            element={<Stopwatch />}
                        />
                        <Route
                            path='/admin/app/coupon'
                            element={<Coupon />}
                        />
                        <Route
                            path='/admin/app/toss'
                            element={<Toss />}
                        />

                        {/* Management */}
                        <Route
                            path='/admin/product/new'
                            element={<NewProduct />}
                        />
                        <Route
                            path='/admin/product/:id'
                            element={<ProductManagement />}
                        />
                        <Route
                            path='/admin/transaction/:id'
                            element={<TransactionManagement />}
                        />
                    </Route>
                    <Route
                        path='*'
                        element={<NotFoundPage />}
                    />
                </Routes>
            </Suspense>
        </>
    );
};

export default AppRoutes;

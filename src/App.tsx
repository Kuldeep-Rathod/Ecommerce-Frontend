import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import Loading from './components/Loading';
import Header from './components/Header';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { userExist, userNotExist } from './redux/reducer/userReducer';
import { getUser } from './redux/api/userAPI';
import { UserReducerInitialState } from './types/reducer-types';
import ProtectedRoute from './components/ProtectedRoute';
import NotFoundPage from './pages/NotFoundPage';

const Login = lazy(() => import('./pages/Login'));
const Home = lazy(() => import('./pages/Home'));
const Cart = lazy(() => import('./pages/Cart'));
const Search = lazy(() => import('./pages/Search'));
const Shipping = lazy(() => import('./pages/Shipping'));
const Orders = lazy(() => import('./pages/Orders'));
const OrderDetails = lazy(() => import('./pages/OrderDetails'));

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

const App = () => {
    const { user, loading } = useSelector(
        (state: { userReducer: UserReducerInitialState }) =>
            state.userReducer || { user: null }
    );
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            try {
                if (user) {
                    console.log('User is logged in:', user.uid);
                    const data = await getUser(user.uid);
                    if (data?.user) {
                        dispatch(userExist(data.user));
                    } else {
                        console.warn('No user data returned from getUser API');
                        dispatch(userNotExist());
                    }
                } else {
                    console.log('No user is logged in');
                    dispatch(userNotExist());
                }
            } catch (error) {
                console.error('Error during auth state change:', error);
                // Optional: dispatch an error action if your Redux store handles it
                // dispatch(userError(error));
                dispatch(userNotExist());
            }
        });

        // Clean up the listener on unmount
        return () => unsubscribe();
    }, [dispatch]);

    return loading ? (
        <Loading />
    ) : (
        <Router>
            {/* Header */}

            <Header user={user} />

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
                            path='/shipping'
                            element={<Shipping />}
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
            <Toaster position='top-center' />
        </Router>
    );
};

export default App;

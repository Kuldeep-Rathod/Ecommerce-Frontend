import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
    FaBars,
    FaHeart,
    FaSearch,
    FaShoppingBag,
    FaTimes,
    FaUser,
} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { useGetWishlistQuery } from '../redux/api/wishlistAPI';
import { CartReducerInitialState } from '../types/reducer-types';
import { User } from '../types/types';

interface PropsType {
    user: User | null;
}

const Header = ({ user }: PropsType) => {
    const { cartItems } = useSelector(
        (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
    );
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    const { data: wishlistData } = useGetWishlistQuery(user?._id!);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            setIsMenuOpen(false);
        }
    };

    const logoutHandler = async () => {
        try {
            await signOut(auth);
            toast.success('Sign out successfully');
        } catch (error) {
            console.log('Failed to sign out', error);
            toast.error('Failed to sign out');
        }
    };

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <div className='header-container'>
                <button
                    className='mobile-menu-btn'
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label='Toggle menu'
                >
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>

                <Link
                    to='/'
                    className='header-logo'
                >
                    <span>Quick</span>Cart
                </Link>

                <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                    <div className='mobile-search'>
                        <form onSubmit={handleSearch}>
                            <input
                                type='text'
                                placeholder='Search products...'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button type='submit'>
                                <FaSearch />
                            </button>
                        </form>
                    </div>

                    <div className='main-links'>
                        <Link
                            to='/'
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to='/search'
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Shop
                        </Link>
                        <Link
                            to='/categories'
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Categories
                        </Link>
                        <Link
                            to='/deals'
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Deals
                        </Link>
                        <Link
                            to='/about'
                            onClick={() => setIsMenuOpen(false)}
                        >
                            About
                        </Link>
                    </div>

                    <div className='user-controls'>
                        {user ? (
                            <div className='user-dropdown'>
                                <button className='user-btn'>
                                    <FaUser />
                                    <span className='user-name'>
                                        {user.name.split(' ')[0]}
                                    </span>
                                </button>
                                <div className='dropdown-content'>
                                    <Link
                                        to='/account'
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        My Account
                                    </Link>
                                    <Link
                                        to='/orders'
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        My Orders
                                    </Link>
                                    <Link
                                        to='/wishlist'
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Wishlist
                                    </Link>
                                    {user.role === 'admin' && (
                                        <Link
                                            to='/admin/dashboard'
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Dashboard
                                        </Link>
                                    )}
                                    <button
                                        className='logout-btn'
                                        onClick={logoutHandler}
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link
                                to='/login'
                                className='auth-link'
                            >
                                <FaUser /> Sign In
                            </Link>
                        )}

                        <Link
                            to='/wishlist'
                            onClick={() => setIsMenuOpen(false)}
                            className='icon-link'
                        >
                            <FaHeart />
                            <span className='badge'>
                                {wishlistData?.items.length}
                            </span>
                        </Link>

                        <Link
                            to='/cart'
                            onClick={() => setIsMenuOpen(false)}
                            className='icon-link cart-icon'
                        >
                            <FaShoppingBag />
                            {cartItems.length > 0 ? (
                                <span className='badge'>
                                    {cartItems.length}
                                </span>
                            ) : (
                                ''
                            )}
                        </Link>
                    </div>
                </nav>

                <form
                    className='desktop-search'
                    onSubmit={handleSearch}
                >
                    <input
                        type='text'
                        placeholder='Search products...'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type='submit'>
                        <FaSearch />
                    </button>
                </form>
            </div>
        </header>
    );
};

export default Header;

import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const MyAccount = () => {
    const { user } = useSelector((state: RootState) => state.userReducer);

    if (!user) return toast('User Not Found');

    const formatDate = (timestamp: string | Date) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success('Sign out successfully');
        } catch (error) {
            console.log('Failed to sign out', error);
            toast.error('Failed to sign out');
        }
    };

    return (
        <div className='account-container'>
            <div className='account-header'>
                <h1>My Account</h1>
            </div>

            <div className='profile-section'>
                <img
                    src={user.photo}
                    alt={`${user.name}'s profile`}
                    className='profile-pic'
                    onError={(e) => {
                        (e.target as HTMLImageElement).src =
                            'https://via.placeholder.com/120';
                    }}
                />
                <div className='profile-info'>
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                    <span className={`badge ${user.role}`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                </div>
            </div>

            <div className='details-card'>
                <h3>Personal Information</h3>
                <div className='detail-row'>
                    <span className='detail-label'>Gender</span>
                    <span className='detail-value'>{user.gender}</span>
                </div>
                <div className='detail-row'>
                    <span className='detail-label'>Date of Birth</span>
                    <span className='detail-value'>{formatDate(user.dob)}</span>
                </div>
                <div className='detail-row'>
                    <span className='detail-label'>Member Since</span>
                    <span className='detail-value'>
                        {formatDate(user.createdAt!)}
                    </span>
                </div>
            </div>

            <div className='action-buttons'>
                <button
                    className='btn btn-logout'
                    onClick={handleLogout}
                    aria-label='Logout'
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default MyAccount;

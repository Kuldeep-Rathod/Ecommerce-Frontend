import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { auth } from '../firebase';
import { useLoginMutation } from '../redux/api/userAPI';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { MessageResponse } from '../types/api-types';
import { Navigate } from 'react-router-dom';

const Login = () => {
    const [gender, setGender] = useState<string>('');
    const [date, setDate] = useState<string>('');

    const [login] = useLoginMutation();

    const loginHandler = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const { user } = await signInWithPopup(auth, provider);

            const res = await login({
                name: user.displayName!,
                email: user.email!,
                photo: user.photoURL!,
                gender,
                role: 'user',
                dob: date,
                _id: user.uid,
            });

            if ('data' in res) {
                toast.success(res.data?.message || 'Login Successful');
            } else {
                const error = res.error as FetchBaseQueryError;
                const message = error.data as MessageResponse;
                toast.error(message.message);
            }

            // console.log('User signed in:', user);
            toast.success('Sign in successful');

            <Navigate to={'/'} />;
        } catch (error) {
            console.error('Error during sign-in:', error);
            toast.error('Sign in failed');
        }
    };

    return (
        <div className='login'>
            <main>
                <h1>Login</h1>

                <div>
                    <label htmlFor='email'>Gender</label>
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value=''>Select Gender</option>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                    </select>
                </div>

                <div>
                    <label htmlFor='date'>Date of Birth</label>
                    <input
                        type='date'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                <div>
                    <p>Already have an account?</p>
                    <button onClick={loginHandler}>
                        <FcGoogle />
                        <span>Sign in with Google</span>
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Login;

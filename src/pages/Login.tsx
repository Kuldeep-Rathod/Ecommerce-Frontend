import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase";

const Login = () => {
    const [gender, setGender] = useState<string>("");
    const [date, setDate] = useState<string>("");

    const loginHandler = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const { user } = await signInWithPopup(auth, provider);
    
            console.log("User signed in:", user);
            toast.success("Sign in successful");
        } catch (error) {
            console.error("Error during sign-in:", error);
            toast.error("Sign in failed");
        }
    };
    

    return (
        <div className="login">
            <main>
                <h1>Login</h1>

                <div>
                    <label htmlFor="email">Gender</label>
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="date">Date of Birth</label>
                    <input
                        type="date"
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

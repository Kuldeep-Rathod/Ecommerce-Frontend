import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const [gender, setGender] = useState<string>("");
    const [date, setDate] = useState<string>("");

    const loginHandler = () => {};

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
                        <FcGoogle /><span>Sign in with Google</span>
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Login;

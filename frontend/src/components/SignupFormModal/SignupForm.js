import { useState } from "react";
import { useDispatch } from "react-redux";
// import { Redirect } from "react-router";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

export default function SignupForm({setShowModal}) {

    const dispatch = useDispatch();
    // const sessionUser = useSelector(state => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    // if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            return dispatch(sessionActions.signupUser({ email, username, password }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors){
                        setErrors(data.errors);
                    }else {
                        sessionActions.sessionAdd(data.user);
                        setErrors([]);
                        setShowModal(false);
                    }
                });
        }
        return setErrors(['Password and confirmed password must match']);
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <div>
                {errors.map((error, idx) => <p key={idx}>{error}</p>)}
            </div>
            <div>
                <input
                    placeholder="Email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div>
                <input
                    placeholder="Username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>

            <div>
                <input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <div>
                <input
                    placeholder="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>
            <button className="appSubmitButton" type="submit">Sign Up</button>
        </form>
    );
}

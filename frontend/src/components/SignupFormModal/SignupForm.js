import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

export default function SignupForm({setShowModal}) {

    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
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
                    if(res.ok) {
                        setErrors([]);
                        setShowModal(false);
                        history.push(`/users/${sessionUser.id}`);
                        return;
                    }else {
                        const data = await res.json();
                        if (data && data.errors){
                            setErrors(data.errors);
                        }
                    }
                });
        }
        return setErrors(['Password and confirmed password must match']);
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <div>
                {errors.map((error, idx) => <p key={idx} className="signup__error">{error}</p>)}
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

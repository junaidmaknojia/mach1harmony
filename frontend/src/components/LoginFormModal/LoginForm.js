import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import * as sessionActions from "../../store/session";
import "./LoginForm.css";


export default function LoginForm() {

    const dispatch = useDispatch();
    // const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    // if (sessionUser) {
    //     return <Redirect to="/"/>
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json(); // had errors here earlier
                if (data && data.errors) setErrors(data.errors);
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <input
                placeholder="Username or Email"
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
            />
            <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Log In</button>
        </form>
    );
}

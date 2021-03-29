import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./LoginForm.css";


export default function LoginForm() {

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
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
                console.log("res---------", res);
                const data = await res.json();
                // const data = JSON.parse(res);
                console.log("data -----------", data);
                if (data && data.errors) setErrors(data.errors);
            });
        // had to refactor this code to not show res.json() error page
    }

    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label>
                Username or Email
                <input
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                />
            </label>
            <label>
                Password
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <button onSubmit={handleSubmit} type="submit">Log In</button>
        </form>
    );
}

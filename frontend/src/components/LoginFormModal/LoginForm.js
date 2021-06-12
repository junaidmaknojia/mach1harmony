import { useDispatch} from "react-redux";
import { useState } from "react";
import * as sessionActions from "../../store/session";
import "./LoginForm.css";


export default function LoginForm() {

    const dispatch = useDispatch();
    // const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const loginDemo = () => {
        dispatch(sessionActions.login({ "credential": "demouser@yahoo.com", "password": "password" }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            }
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            }
        );
    }

    return (
        <form onSubmit={handleSubmit} className="loginForm">
            <div>
                {errors.map((error, idx) => <p key={idx}>{error}</p>)}
            </div>
            <div>
                <input
                    placeholder="Username or Email"
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    // required
                />
            </div>
            <div>
                <input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    // required
                />
            </div>
            <button type="submit" className="appSubmitButton">Log In</button>
            <button onClick={loginDemo} className="appSubmitButton">Demo User</button>
        </form>
    );
}

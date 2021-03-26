import { csrfFetch } from "./csrf";

const SESSION_ADD = "session/setUser"
const SESSION_REMOVE = "session/removeUser"

const initialState = {user: null};

const sessionAdd = () => {{
    return {
        type: SESSION_ADD,
        payload: user
    }
}}

const sessionRemove = () => {{
    return {type: SESSION_REMOVE}
}}

export function login(user) {
    return async (dispatch) => {
        const {credentials, password} = user;
        const response = await csrfFetch("/api/session", {
            method: "POST",
            body: JSON.stringify({ credentials, password })
        });
        const data = await response.json();
        dispatch(setUser(data.user));
        return response;
    }
}

export async function restoreUser(user) {
    return async (dispatch) => {
        const response = await csrfFetch("/api/session");
        const parsed = await response.json();
        dispatch(setUser(parsed.user));
        return response;
    }
}

export async function signupUser(user) {
    return async (dispatch) => {
        const {username, email, password} = user;
        const response = await csrfFetch("api/users", {
            method: "POST",
            body: JSON.stringify({username, email, password})
        });
        const parsed = response.json();
        dispatch(setUser(parsed.user));
        return parsed;
    }
}

const sessionReducer = (state=initialState, action) => {
    let newState = {};
    switch(action.type){
        case SESSION_ADD:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState
        case SESSION_REMOVE:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        default:
            return state;
    }
}

export default sessionReducer;

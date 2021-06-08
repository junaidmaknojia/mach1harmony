import { csrfFetch } from "./csrf";

const SESSION_ADD = "session/setUser"
const SESSION_REMOVE = "session/removeUser"

const initialState = {user: null};

export const sessionAdd = (user) => {
    return {
        type: SESSION_ADD,
        payload: user
    }
}

const sessionRemove = () => {
    return {type: SESSION_REMOVE}
}

export function login(user) {
    return async (dispatch) => {
        const {credential, password} = user;
        const response = await csrfFetch("/api/session", {
            method: "POST",
            body: JSON.stringify({ credential, password })
        });
        const data = await response.json();
        dispatch(sessionAdd(data.user));
        return response;
    }
}

export function restoreUser(user) {
    return async (dispatch) => {
        const response = await csrfFetch("/api/session");
        const parsed = await response.json();
        dispatch(sessionAdd(parsed.user));
        return response;
    }
}

export function signupUser(user) {
    return async (dispatch) => {
        const {username, email, password} = user;
        const response = await csrfFetch("/api/users", {
            method: "POST",
            body: JSON.stringify({username, email, password})
        });
        if(response.ok) {
            const parsed = response.json();
            dispatch(sessionAdd(parsed.user));
        }
        return response;
    }
}

export const logout = (user) => async (dispatch) => {
    const response = csrfFetch("/api/session", {
        method: "DELETE"
    });
    dispatch(sessionRemove());
    return response;
}

const sessionReducer = (state=initialState, action) => {
    let newState = {};
    switch(action.type){
        case SESSION_ADD:
            newState = Object.assign({}, state);
            newState.user = action.payload;
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

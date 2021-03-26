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

export const login = (user) => async (dispatch) => {
    const {credentials, password} = user;
    const response = await csrfFetch("/api/session", {
        method: "POST",
        body: JSON.stringify({ credentials, password })
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
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

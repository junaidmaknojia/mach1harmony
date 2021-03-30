import { csrfFetch } from "./csrf";

const CREATE_SONG = "song/createSong";

const initialState = {user: null};

// const createSong = (info) => {
//     return {
//         type: CREATE_SONG,
//         payload: info
//     }
// }

export function createSong(payload) {
    return async (dispatch) => {
        const response = await csrfFetch("/api/songs", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {"Content-Type": "application/JSON"}
        });

        if(response.ok){
            const song = await response.json();
            // dispatch(createSong(song));
            return song;
        }
    }
}

const songReducer = (state=initialState, action) => {
    let newState = {};
    switch(action.type){
        // case SESSION_ADD:
        //     newState = Object.assign({}, state);
        //     newState.user = action.payload;
        //     return newState
        // case SESSION_REMOVE:
        //     newState = Object.assign({}, state);
        //     newState.user = null;
        //     return newState;
        default:
            return state;
    }
}

export default songReducer;

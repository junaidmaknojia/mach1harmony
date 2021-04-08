import { csrfFetch } from "./csrf";

export const SET_STATE_SONG = "song/setStateSong"
const initialState = {user: null};

// const createSong = (info) => {
//     return {
//         type: CREATE_SONG,
//         payload: info
//     }
// }

export function incrementListen(songId) {
    return async (dispatch) => {
        const response = await csrfFetch(`/api/songs/listens/${songId}`);

        if(response.ok){}
    }
}

export const sendSong = (song) => async (dispatch) => {
    await dispatch(setStateSong(song));
}

const setStateSong = (song) => ({
    type: SET_STATE_SONG,
    song
});

const playBarReducer = (state=initialState, action) => {
    let newState = {};
    switch(action.type){
        case SET_STATE_SONG:
            newState = Object.assign({}, state);
            newState["currSong"] = action.song;
            return {...state, ...newState};
        default:
            return state;
    }
}

export default playBarReducer;

import { csrfFetch } from "./csrf";

const initialState = {user: null};

export function showSongs(genreId) {
    return async (dispatch) => {
        const response = await csrfFetch(`/api/genres/${genreId}`);

        if(response.ok){
            return response.json();
        }
    }
}

export function getGenres() {
    return async (dispatch) => {
        const response = await csrfFetch("/api/genres");

        if(response.ok){
            return response.json();
        }
    }
}

const genreReducer = (state=initialState, action) => {
    // eslint-disable-next-line
    let newState = {};
    switch(action.type){
        // case SET_STATE_SONG:
            // newState = Object.assign({}, state);
            // newState["currSong"] = action.song;
            // return {...state, ...newState};
        default:
            return state;
    }
}

export default genreReducer;

import { csrfFetch } from "./csrf";

const initialState = {user: null};

// const results = ()

export function searchThunk(searchTerm) {
    return async (dispatch) => {
        const response = await csrfFetch(`/api/searches/${searchTerm}`);

        if(response.ok){
            const results = await response.json();
            console.log(results);
        }
    }
}

const searchReducer = (state=initialState, action) => {
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

export default searchReducer;

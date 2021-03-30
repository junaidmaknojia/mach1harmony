import { csrfFetch } from "./csrf";

export const CREATE_SONG = "song/createSong";
export const LOAD_SONGS = "song/loadSongs";

const initialState = {user: null};

// const createSong = (info) => {
//     return {
//         type: CREATE_SONG,
//         payload: info
//     }
// }

const load = (songs, userId) => ({
    type: LOAD_SONGS,
    songs,
    userId
})

export const loadSongsThunk = (sessionUser) => async (dispatch) => {
    // console.log(sessionUser.id);
    const response = await csrfFetch(`/api/users/${sessionUser.id}`);
    // console.log(await response.json());

    if(response.ok){
        const songs = await response.json();
        dispatch(load(songs, sessionUser.id));
    }
}

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
        case LOAD_SONGS:
            newState = Object.assign({}, state);
            action.songs.forEach(song => {
                console.log(song);
                newState[song.id] = song;
            });
            return {...state, ...newState};
        // case SESSION_REMOVE:
        //     newState.user = null;
        //     return newState;
        default:
            return state;
    }
}

export default songReducer;

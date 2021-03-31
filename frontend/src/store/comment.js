import { csrfFetch } from "./csrf";

// export const CREATE_SONG = "song/createSong";

// const load = (songs, userId) => ({
    //     type: LOAD_SONGS,
    //     songs,
    //     userId
    // })

const initialState = {user: null};

export const loadComments = (songId) => async (dispatch) => {

    const response = await csrfFetch(`/api/comments/${songId}`);

    if(response.ok){
        const comments = await response.json();
        return comments;
    }
}

export function addComment(payload) {
    return async (dispatch) => {
        const response = await csrfFetch(`/api/comments/${songId}`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {"Content-Type": "application/JSON"}
        });

        if(response.ok) {
            return await response.json();
        }
    }
}

export default function commentReducer(state=initialState, action) {
    let newState = {};
    switch(action.type){
        // case LOAD_SONGS:
        //     // newState = Object.assign({}, state);
        //     // action.songs.songs.forEach(song => {
        //     //     newState[song.id] = song;
        //     // });
        //     return {...state, ...newState};
        // // case SESSION_REMOVE:
        // //     newState.user = null;
        // //     return newState;
        default:
            return state;
    }
}

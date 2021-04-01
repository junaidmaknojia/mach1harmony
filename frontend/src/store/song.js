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

export const loadSongsThunk = (userId) => async (dispatch) => {
    // console.log(sessionUser.id);
    const response = await csrfFetch(`/api/users/${userId}`);
    // console.log(await response.json());

    if(response.ok){
        const songs = await response.json();
        dispatch(load(songs, userId));
    }
}

export function createSong(payload) {
    return async (dispatch) => {
        const {title, artist, album, year, songUpload, imageUpload, userId} = payload;
        const formData = new FormData();
        formData.append("title", title);
        formData.append("artist", artist);
        formData.append("album", album);
        formData.append("year", year);

        if (songUpload) {
            formData.append("song", songUpload);
        }

        const response = await csrfFetch(`/api/songs/${userId}`, {
            method: "POST",
            headers: {"Content-Type": "multipart/form-data"},
            body: formData
        });

        if(response.ok){
            const song = await response.json();
            // dispatch(createSong(song));
            console.log(song);
            return song;
        }
    }
}

export function updateSong(payload, songId){
    return async (dispatch) => {
        const response = await csrfFetch(`api/songs/${songId}`, {
            method: "PUT",
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

export function deleteSong(songId) {
    return async (dispatch) => {
        const response = await csrfFetch(`api/songs/${songId}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/JSON"}
        });

        console.log(await response.json());

        if(response.ok){
            return true;
        }
    }
}

const songReducer = (state=initialState, action) => {
    let newState = {};
    switch(action.type){
        case LOAD_SONGS:
            newState = Object.assign({}, state);
            action.songs.songs.forEach(song => {
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

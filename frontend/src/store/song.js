import { csrfFetch } from "./csrf";

export const CREATE_SONG = "song/createSong";
export const LOAD_SONGS = "song/loadSongs";
// export const SET_STATE_SONG = "song/setStateSong"

const initialState = {user: null};

const load = (songs, userId) => ({
    type: LOAD_SONGS,
    songs,
    userId
})

export const loadSongsThunk = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}`);

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

        // frontend check on a file upload in order of how it will be unloadaed in the backend
        // files[0] = song, files[1] = cover photo
        if (songUpload) {
            formData.append("files", songUpload);
        }
        if(imageUpload){
            formData.append("files", imageUpload);
        }

        const response = await csrfFetch(`/api/songs/${userId}`, {
            method: "POST",
            headers: {"Content-Type": "multipart/form-data"},
            body: formData
        });

        if(response.ok){
            const song = await response.json();
            // dispatch(createSong(song));
            return song;
        }
    }
}

export function updateSong(payload, songId){
    return async (dispatch) => {
        const {title, artist, album, year, songUpload, imageUpload, userId} = payload;
        const formData = new FormData();
        formData.append("title", title);
        formData.append("artist", artist);
        formData.append("album", album);
        formData.append("year", year);
        formData.append("userId", userId);

        if (songUpload) {
            formData.append("files", songUpload);
        }
        if(imageUpload){
            formData.append("files", imageUpload);
        }

        const response = await csrfFetch(`/api/songs/${songId}`, {
            method: "PUT",
            headers: {"Content-Type": "multipart/form-data"},
            body: formData
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

        // console.log(await response.json());

        if(response.ok){
            return true;
        }
    }
}

const songReducer = (state=initialState, action) => {
    let newState = {};
    switch(action.type){
        case LOAD_SONGS:
            // newState = Object.assign({}, state);
            action.songs.songs.forEach(song => {
                newState[song.id] = song;
            });
            return newState;
        // case SET_STATE_SONG:
        //     newState = Object.assign({}, state);
        //     newState["currSong"] = action.song;
        //     return {...state, ...newState};
        default:
            return state;
    }
}

export default songReducer;

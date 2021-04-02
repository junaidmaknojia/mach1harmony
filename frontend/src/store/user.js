import { csrfFetch } from "./csrf";

// export const CREATE_SONG = "song/createSong";

const initialState = {user: null};

// const createSong = (info) => {
//     return {
//         type: CREATE_SONG,
//         payload: info
//     }
// }


export function updateFollow(userId, followerId) {
    return async (dispatch) => {
        // userId is the person who's page we're on
        // followerId is me, which users am I the follower for?
        const response = await csrfFetch(`api/users/follow/${userId}`, {
            method: "PATCH",
            body: JSON.stringify({followerId}),
            headers: {"Content-Type": "application/JSON"}
        });

        if(response.ok){
            return response.json(); // true or false based on
        }
    }
}

// export function getFollowStatus(userId) {
//     return async (dispatch) => {

//     }
// }


const userReducer = (state=initialState, action) => {
    let newState = {};
    switch(action.type){
        // case LOAD_SONGS:
        //     newState = Object.assign({}, state);
        //     action.songs.songs.forEach(song => {
        //         newState[song.id] = song;
        //     });
        //     return {...state, ...newState};
        // case SET_STATE_SONG:
        //     newState = Object.assign({}, state);
        //     newState["currSong"] = action.song;
        //     return {...state, ...newState};
        default:
            return state;
    }
}

export default userReducer;

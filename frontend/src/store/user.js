import { csrfFetch } from "./csrf";

export const FOLLOW_DATA = "user/follow";

const initialState = {user: null};

const updatePeopleFollowing = (followers, following) => {
    return {
        type: FOLLOW_DATA,
        followers,
        following
    }
}

export function getFollowInfo(followerId) {
    return async (dispatch) => {
        // followerId is Bob, which users is Bob following?
        const response = await csrfFetch(`api/users/follow/${followerId}`);

        if(response.ok){
            const followInfo = await response.json();
            console.log(followInfo);
            // const {followers, following} = followInfo;
            // dispatch(updatePeopleFollowing(followers, following));
            // return following;
        }
    }
}

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
            const isFollowing = await response.json();
            return isFollowing; // true or false
        }
    }
}

// export function getFollowStatus(userId) {
    //     return async (dispatch) => {

        //     }
        // }

export function updateProfile(payload) {
    return async (dispatch) => {
        const {bio, profileUpload, userId} = payload;
        const formData = new FormData();
        formData.append("bio", bio);
        if (profileUpload) {
            formData.append("profilePic", profileUpload);
        }
        const response = await csrfFetch(`/api/users/${userId}`, {
            method: "PATCH",
            headers: {"Content-Type": "multipart/form-data"},
            body: formData
        });

        if(response.ok){
            return await response.json();
        }
    }
}

const userReducer = (state=initialState, action) => {
    let newState = {};
    switch(action.type){
        case FOLLOW_DATA:
            newState = Object.assign({}, state);
            newState["following"] = action.following;
            newState["followers"] = action.followers;
            return {...state, ...newState};
        // case SET_STATE_SONG:
        //     newState = Object.assign({}, state);
        //     newState["currSong"] = action.song;
        //     return {...state, ...newState};
        default:
            return state;
    }
}

export default userReducer;

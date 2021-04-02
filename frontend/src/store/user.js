import { csrfFetch } from "./csrf";

export const FOLLOWING_PEOPLE = "user/following";

const initialState = {user: null};

const updatePeopleFollowing = (peopleFollowing) => {
    return {
        type: FOLLOWING_PEOPLE,
        peopleFollowing
    }
}

export function getPeopleIFollow(followerId) {
    return async (dispatch) => {
        // followerId is me, which users am I the follower for?
        const response = await csrfFetch(`api/users/follow/${followerId}`);

        if(response.ok){
            const following = await response.json();
            dispatch(updatePeopleFollowing(following));
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
            const following = await response.json();
            dispatch(updatePeopleFollowing(following) );
            return response.json(); // true or false based on
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
        case FOLLOWING_PEOPLE:
            newState = Object.assign({}, state);
            newState["following"] = action.peopleFollowing;
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

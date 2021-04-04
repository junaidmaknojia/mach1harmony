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

export function getUserInfo(userId){
    return async (dispatch) => {
        const response = await csrfFetch(`api/users/info/${userId}`);

        if(response.ok) {
            const user = await response.json();
            return user;
        }
    }
}

export function getFollowInfo(followerId) {
    return async (dispatch) => {
        // followerId is Bob, which users is Bob following and getting followed by?
        const response = await csrfFetch(`api/users/follow/${followerId}`);

        if(response.ok){
            const followInfo = await response.json();
            const {peopleImFollowing, peopleFollowingMe} = followInfo;
            const followers = peopleFollowingMe[0]?.Follows.map(f => f.User);
            const following = peopleImFollowing?.otherPeople;
            dispatch(updatePeopleFollowing(followers, following));
            return following;
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

export function loadHomeSongs() {
    return async (dispatch) => {
        const response = await csrfFetch("/api/songs");

        if(response.ok){
            return await response.json();
        }
    }
}

export function loadHomeUsers() {
    return async (dispatch) => {
        const response = await csrfFetch("/api/users");

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
        default:
            return state;
    }
}

export default userReducer;

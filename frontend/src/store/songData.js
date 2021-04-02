import { csrfFetch } from "./csrf";

export const SONG_COMMENTS = "song/comments";
export const NEW_COMMENT = "song/newComment";

const allComments = (comments) => ({
        type: SONG_COMMENTS,
        comments
});

const updateComments = (comment) => ({
    type: NEW_COMMENT,
    comment
})

const initialState = {user: null};

export const loadComments = (songId) => async (dispatch) => {

    const response = await csrfFetch(`/api/comments/${songId}`);

    if(response.ok){
        const comments = await response.json();
        dispatch(allComments(comments));
        return comments;
    }
}

export function addComment(payload, songId) {
    return async (dispatch) => {
        const response = await csrfFetch(`/api/comments/${songId}`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {"Content-Type": "application/JSON"}
        });

        if(response.ok) {
            const newComment = await response.json();
            // dispatch(updateComments(newComment));
            // const comments = await response.json();
            dispatch(loadComments(songId));
        }
    }
}

export function editComment(payload, commentId) {
    return async (dispatch) => {
        const {songId} = payload;
        const response = await csrfFetch(`/api/comments/${commentId}`, {
            method: "PUT",
            body: JSON.stringify(payload),
            headers: {"Content-Type": "application/JSON"}
        });

        if(response.ok) {
            dispatch(loadComments(songId));
            return await response.json();
        }
    }
}

export function deleteComment(commentId, songId){
    return async (dispatch) => {
        const response = await csrfFetch(`/api/comments/${commentId}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/JSON"}
        });

        if(response.ok) {
            dispatch(loadComments(songId));
            // return await response.json();
        }
    }
}

// export function loadLikes(songId) {
//     return async (dispatch) => {
//         const response = await csrfFetch(`/api/songs/likes/${songId}`);

//         if(response.ok){
//             return await response.json();
//         }
//     }
// }
// export function userLike(songId) {
//     return async (dispatch) => {
//         const response = await csrfFetch(`/api/likes/${songId}`, {
//             method: "PATCH",
//             headers: {"Content-Type": "application/JSON"}
//         });

//         // if(response.ok){
//         //     return await response.json();
//         // }
//     }
// }

export default function songDataReducer(state=initialState, action) {
    let newState = {};
    switch(action.type){
        case SONG_COMMENTS:
            newState = Object.assign({}, state);
            newState["songComments"] = action.comments;
            return {...state, ...newState};
        case NEW_COMMENT:
            newState = Object.assign({}, state);
            console.log(newState["songComments"]);
            newState["songComments"].push(action.comment);
            return {...state, ...newState};
        default:
            return state;
    }
}

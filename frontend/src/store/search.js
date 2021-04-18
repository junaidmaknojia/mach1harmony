import { csrfFetch } from "./csrf";

const initialState = {user: null};
const SET_SEARCH_RESULTS = "search/results"

const setSearchResults = (results) => ({
    type: SET_SEARCH_RESULTS,
    results
});

export function searchThunk(searchTerm) {
    console.log("inside thunk");
    return async (dispatch) => {
        const response = await csrfFetch(`/api/searches/${searchTerm}`);

        if(response.ok){
            const results = await response.json();
            console.log(results);
            await dispatch(setSearchResults(results));
        }
    }
}

const searchReducer = (state=initialState, action) => {
    // eslint-disable-next-line
    let newState = {};
    switch(action.type){
        case SET_SEARCH_RESULTS:
            // console.log(action.results);
            newState = Object.assign({}, state);
            newState["results"] = action.results;
            return {...state, ...newState};
        default:
            return state;
    }
}

export default searchReducer;

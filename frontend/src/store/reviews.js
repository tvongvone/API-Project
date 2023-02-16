
import { csrfFetch } from "./csrf";

const GETSPOTREVIEWS = 'reviews/getspotreviews'

const spotReviews = reviews => {
    return {
        type: GETSPOTREVIEWS,
        reviews
    }
}


// Thunk creators

export const getSpotReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if(response.ok) {
        const data = await response.json()

        dispatch(spotReviews(data))
    }
}

const initialStates = {
    spot: {},
    user: {}
};

export default function reviewsReducer(state = initialStates, action) {
    switch(action.type) {
        case GETSPOTREVIEWS:
        const newState = {...state, spot: {}}
        action.reviews.forEach(ele => newState.spot[ele.id] = ele)
        return newState
        default: return state
    }
}

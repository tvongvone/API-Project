
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

        console.log('From store', data)

        dispatch(spotReviews(data))
    }
}

const initialStates = [];

export default function reviewsReducer(state = initialStates, action) {
    switch(action.type) {
        case GETSPOTREVIEWS:
        return action.reviews
        default: return state
    }
}

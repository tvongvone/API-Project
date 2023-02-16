
import { csrfFetch } from "./csrf";

const GETSPOTREVIEWS = 'reviews/getspotreviews'
const CREATEREVIEW = 'reviews/createreview'

const spotReviews = reviews => {
    return {
        type: GETSPOTREVIEWS,
        reviews
    }
}

const createReview = review => {
    return {
        type: CREATEREVIEW,
        review
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

export const createSingleReview = (id,obj) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })

    if(response.ok){
        const data = await response.json();

        dispatch(createReview(data))
    }
}

const initialStates = {
    spot: {},
    user: {}
};

export default function reviewsReducer(state = initialStates, action) {
    switch(action.type) {
        case GETSPOTREVIEWS: {
        const newState = {...state, spot: {}}
        action.reviews.forEach(ele => newState.spot[ele.id] = ele)
        return newState
        }
        case CREATEREVIEW: {
            const newState = {...state}
            newState.spot[action.review.id] = action.review
            return newState
        }
        default: return state
    }
}

import { csrfFetch } from "./csrf"

const GETSINGLESPOT = 'spots/getsinglespot'

const getSingle = spot => {
    return {
        type: GETSINGLESPOT,
        spot
    }
}


export const getSingleSpot = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`)

    if(response.ok) {
        const data = await response.json()
        dispatch(getSingle(data))
    }
}

export default function singleSpotReducer(state = {}, action) {
    switch(action.type) {
        case GETSINGLESPOT:
            return action.spot
        default: return state
    }
}

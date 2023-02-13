import { csrfFetch } from "./csrf"

const GETSINGLESPOT = 'spots/getsinglespot'
const CREATESINGLESPOT = 'spots/createsinglespot'
const ADDPREVIEWIMAGE = 'spots/addpreviewimage'

const getSingle = spot => {
    return {
        type: GETSINGLESPOT,
        spot
    }
}

const createSingle = spot => {
    return {
        type: CREATESINGLESPOT,
        spot
    }
}

const addPreviewImage = image => {
    return {
        type: ADDPREVIEWIMAGE,
        image
    }
}


export const getSingleSpot = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`)

    if(response.ok) {
        const data = await response.json()
        dispatch(getSingle(data))
    }
}

export const createSingleSpot = obj => async dispatch => {

    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
        const data = await response.json()

        dispatch(createSingle(data))

        return data
}

export const postPreviewImage = (obj) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${obj.id}/images`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({url: obj.url, preview:true})
    })

    const data = response.json()

    dispatch(addPreviewImage(data))
}

export default function singleSpotReducer(state = {}, action) {
    switch(action.type) {
        case GETSINGLESPOT:
            return action.spot
        case CREATESINGLESPOT:
            return action.spot
        case ADDPREVIEWIMAGE:
            const newState = {...state}
            newState.SpotImages = [action.image]
        default: return state

    }
}

import { csrfFetch } from "./csrf";

const LOAD = 'spots/load'
const GETSINGLESPOT = 'spots/getsinglespot'
const CREATESINGLESPOT = 'spots/createsinglespot'
const ADDPREVIEWIMAGE = 'spots/addpreviewimage'


const load = spots => {
    return {
        type: LOAD,
        spots
    }
}

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


export const getAllSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots')

    if(response.ok) {
        const data = await response.json()
        dispatch(load(data.Spots))
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

    const data = await response.json()

    dispatch(addPreviewImage(data))
}




const initialState = {
    allSpots : [],
    singleSpot : {}
}

const spotsReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD: {
            const newState = {...state}
            action.spots.forEach(ele => newState.allSpots[ele.id] = ele)
            return newState
        }
        case GETSINGLESPOT: {
        const newState = {...state}
        newState.singleSpot = action.spot
        return newState
        }

        case CREATESINGLESPOT: {
        const newState = {...state}
        newState.allSpots[action.spot.id] = action.spot
        return newState;
        }

        case ADDPREVIEWIMAGE: {
            const newState = {...state}
            console.log(action.image)
            newState.allSpots[action.image.spotId].previewImage = action.image.url
            return newState
        }
        default: return state

    }
}

export default spotsReducer

import { csrfFetch } from "./csrf";

const LOAD = 'spots/load'
const GETSINGLESPOT = 'spots/getsinglespot'
const CREATESINGLESPOT = 'spots/createsinglespot'
const ADDPREVIEWIMAGE = 'spots/addpreviewimage'
const GETCURRENTSPOTS = 'spots/getcurrentspots'
const UPDATEONESPOT = 'spots/updateonespot'


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

const getCurrent = bananas => {
    return {
        type: GETCURRENTSPOTS,
        bananas
    }
}

const updateSingle = spot => {
    return {
        type: UPDATEONESPOT,
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

    console.log(data)

    dispatch(addPreviewImage(data))
}

export const getCurrentSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots/current')

    const data = await response.json()

    dispatch(getCurrent(data.Spots))
}


export const updateOneSpot = (obj, id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
    })

    const data = await response.json()

    dispatch(updateSingle(data))
}




const initialState = {
    allSpots : {},
    singleSpot : {},
    currentSpots: {}
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
            newState.allSpots[action.image.spotId].previewImage = action.image.url
            return newState
        }

        case GETCURRENTSPOTS: {
            const newState = {...state}
            newState.currentSpots = action.bananas
            return newState
        }

        case UPDATEONESPOT: {
            const newState = {...state}
            newState.singleSpot[action.spotId] = action.spot
            return newState;
        }

        default: return state

    }
}

export default spotsReducer

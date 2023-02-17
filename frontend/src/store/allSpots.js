import { csrfFetch } from "./csrf";

const LOAD = 'spots/load'
const GETSINGLESPOT = 'spots/getsinglespot'
const CREATESINGLESPOT = 'spots/createsinglespot'
const ADDPREVIEWIMAGE = 'spots/addpreviewimage'
const GETCURRENTSPOTS = 'spots/getcurrentspots'
const UPDATEONESPOT = 'spots/updateonespot'
const DELETESPOT = 'spots/deleteonespot'
const ADDIMAGE = 'spots/addimage'


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

const addImage = image => {
    return {
        type: ADDIMAGE,
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

const deleteSpot = (spotId) => {
    return {
        type: DELETESPOT,
        spotId
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

export const imageArray = (obj) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${obj.id}/images`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({url: obj.url, preview:false})
    })

    const data = await response.json()

    dispatch(addImage(data))
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

export const deleteSingleSpot =  (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if(response.ok) {
        dispatch(deleteSpot(spotId))
    }
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
            action.spots.forEach(ele => {
                newState.allSpots[ele.id] = ele
            })
            return newState
        }
        case GETSINGLESPOT: {
        const newState = {...state, singleSpot: {}}
        newState.singleSpot = action.spot
        return newState
        }

        case CREATESINGLESPOT: {
        const newState = {...state, allSpots: {...state.allSpots}, singleSpot: {}}
        newState.allSpots[action.spot.id] = action.spot
        newState.singleSpot = action.spot
        return newState;
        }

        case ADDPREVIEWIMAGE: {
            const newState = {...state}
            newState.allSpots[action.image.spotId].previewImage = action.image.url
            return newState
        }

        case ADDIMAGE: {
            const newState = {...state, singleSpot: {...state.singleSpot, SpotImages: [...state.singleSpot.SpotImages]}}
            newState.singleSpot.SpotImages = [...newState.singleSpot.SpotImages, action.image]
            return newState;
        }

        case GETCURRENTSPOTS: {
            const newState = {...state}
            action.bananas.forEach(ele => newState.currentSpots[ele.id] = ele)
            return newState
        }

        case UPDATEONESPOT: {
            const newState = {...state, singleSpot: {}}
            newState.singleSpot[action.spotId] = action.spot
            return newState;
        }

        case DELETESPOT: {
            const newState = {...state}
            delete newState.currentSpots[action.spotId]
            delete newState.allSpots[action.spotId]
            return newState
        }

        default: return state

    }
}

export default spotsReducer

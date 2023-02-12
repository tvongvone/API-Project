import { csrfFetch } from "./csrf";

const LOAD = 'spots/load'


const load = spots => {
    return {
        type: LOAD,
        spots
    }
}



export const getAllSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots')

    if(response.ok) {
        const data = await response.json()
        dispatch(load(data.Spots))
    }
}




const initialState = []

const spotsReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD: {
            const newState = {...state}
            action.spots.forEach(ele => newState[ele.id] = ele)
            return newState
        }
        default: return state
    }
}

export default spotsReducer

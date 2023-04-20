import { csrfFetch } from "./csrf";
const GET_BOOKINGS = 'bookings/get_bookings'


const getBooking = (data) => {
    return {
        type: GET_BOOKINGS,
        payload: data
    }
}


export const getSpotBookings = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}/bookings`)

    const data = await response.json();

    dispatch(getBooking(data))
}

const initialState = {
    spotBooking: {}
}

export default function bookingsReducer(state = initialState, action) {
    switch(action.type) {
        case GET_BOOKINGS: {
            const newState = {...state, spotBooking: {}}
            action.payload.Bookings.forEach(ele => newState.spotBooking[ele.id] = ele)
            return newState
        }
        default: return state;
    }
}

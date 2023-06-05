import { body } from "express-validator";
import { csrfFetch } from "./csrf";
const GET_BOOKINGS = 'bookings/get_bookings'
const CREATE_BOOKING = 'bookings/create_booking'
const BOOKING_ERROR = 'booking/error_booking'


const getBooking = (data) => {
    return {
        type: GET_BOOKINGS,
        payload: data
    }
}

const createBooking = (data) => {
    return {
        type: CREATE_BOOKING,
        payload: data
    }
}

const errBooking = (data) => {
    return {
        type: BOOKING_ERROR,
        payload: data
    }
}

// Get booking
export const getSpotBookings = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}/bookings`)

    const data = await response.json();

    dispatch(getBooking(data))
}

// Create booking
export const createSpotBooking = (id, obj) => async dispatch => {

    // debugger
    try {
        const response = await csrfFetch(`/api/spots/${id}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })

        if(response.ok) {
            const data = await response.json();
            dispatch(createBooking(data))
            return null
        }

    } catch(err) {
        // Create a dispatch to display error
        const response = await err.json()
        return response
    }
}

const initialState = {
    spotBooking: {},
    errorBooking: {}
}

export default function bookingsReducer(state = initialState, action) {
    switch(action.type) {
        case GET_BOOKINGS: {
            const newState = {...state, spotBooking: {}}
            action.payload.Bookings.forEach(ele => newState.spotBooking[ele.id] = ele)
            return newState
        }
        case CREATE_BOOKING: {
            const newState = {...state, spotBooking: {...state.spotBooking}}
            newState.spotBooking[action.payload.id] = action.payload
            return newState
        }
        case BOOKING_ERROR: {
            const newState = {...state, spotBooking: {...state.spotBooking}, errorBooking: {}}
            newState.errorBooking = action.payload
            return newState
        }
        default: return state;
    }
}

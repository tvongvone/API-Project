
import { useEffect } from 'react'
import './bookings.css'
import { useDispatch, useSelector } from 'react-redux'
import { getSpotBookings, removeBookings } from '../../store/bookings'
import { useParams } from "react-router";


export default function Bookings() {
    const {id} = useParams()
    const dispatch = useDispatch();
    const bookings = useSelector(state => state.bookings.spotBooking)

    useEffect(() => {
        dispatch(getSpotBookings(id))

        return () => {
            dispatch(removeBookings())
        }
    }, [dispatch, id])

    return bookings ? (
        <div className="bookings-container">
            <div className="bookings-content">
               <h1>Booking History</h1>
               {bookings.length && (
                <div>
                    <div className="subtitles">
                    <span>First Name</span>
                    <span>Last Name</span>
                    <span>Start Date</span>
                    <span>End Date</span>
                    </div>
                    {bookings.map(ele => (
                        <div className="client-info" key={ele.id}>
                            <span>{ele?.User?.firstName}</span>
                            <span>{ele?.User?.lastName}</span>
                            <span>{ele?.startDate}</span>
                            <span>{ele?.endDate}</span>

                        </div>
                    ))}
                </div>
               )}
            </div>
        </div>
    ) :
    <div className="bookings-container">
    <div className="bookings-content">
       <h1>No bookings at this location</h1>
    </div>
    </div>
}

import './UserBookings.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserBookings } from '../../store/bookings';


export default function UserBookings() {
    const dispatch = useDispatch();

    const userBookings = useSelector(state => state.bookings.userBooking)

    useEffect(() => {
        dispatch(getUserBookings())
    }, [dispatch])

    return userBookings ? (
        <div className="bookings-container">
            <div className="bookings-content">
               <h1>My Bookings</h1>
               {userBookings.length && (
                <div style={{width: '100%', marginTop: '40px'}}>
                    <div className="subtitles">
                    <span>Name</span>
                    <span>Address</span>
                    <span>Start Date</span>
                    <span>End Date</span>
                    </div>
                    {userBookings.map(ele => (
                        <div className="client-info" key={ele.id}>
                            <span>{ele?.Spot?.name}</span>
                            <span>{ele?.Spot?.address}</span>
                            <span>{ele?.startDate.slice(0, 10)}</span>
                            <span>{ele?.endDate.slice(0, 10)}</span>

                        </div>
                    ))}
                </div>
               )}
            </div>
        </div>
    ) :
    <div className="bookings-container">
    <div className="bookings-content">
       <h1>You currently have no bookings</h1>
    </div>
    </div>
}

import './UserBookings.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserBookings } from '../../store/bookings';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';


export default function UserBookings() {
    const dispatch = useDispatch();

    const userBookings = useSelector(state => state.bookings.userBooking)

    useEffect(() => {
        dispatch(getUserBookings())
    }, [dispatch])

    return userBookings ? (
        <div className="bookings-container">
            <div className="user-bookings-content">
               <h1>My Bookings</h1>
                {userBookings.length && (
                    <div style={{display: 'flex', width: '100%', overflow: 'hidden', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                            {userBookings.map(ele => (
                                <div className="user-bookings-data" key={ele.id}>
                                    <NavLink to={`/spots/${ele?.Spot?.id}`}>
                                        <img src={ele?.Spot?.previewImage} />
                                    </NavLink>
                                    <div style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                                        <span style={{maxWidth: '50%', overflow: 'hidden'}}>{ele?.Spot?.name}</span>
                                        <span style={{maxWidth: '50%', overflow: 'hidden'}}>{ele?.Spot?.city}, {ele?.Spot?.state}</span>
                                    </div>

                                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                        <span>Start Date: </span>
                                        <span>{ele?.startDate.slice(0, 10)}</span>
                                    </div>

                                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                        <span>End Date: </span>
                                        <span>{ele?.endDate.slice(0, 10)}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )}
            </div>
        </div>
    ) :
    <div className="bookings-container">
    <div className="user-bookings-content">
       <h1>You currently have no bookings</h1>
    </div>
    </div>
}

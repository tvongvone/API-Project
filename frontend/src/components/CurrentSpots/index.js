
import { useSelector } from 'react-redux'
import { NavLink, Redirect, Link } from 'react-router-dom';
import './CurrentSpots.css'

export default function CurrentSpots() {
    const data = useSelector(state => state.spots)
    const user = useSelector(state => state.session.user)

    const current = Object.values(data.currentSpots)

    if(!user) {
        return <Redirect to='/' />
    }

    return current.length ? (
        <div className='current-container'>
            <div style={{display:'flex', flexDirection: 'column'}}>
                <h1 style={{fontFamily:'cursive'}}>Manage Your Spots</h1>
                <NavLink className='navlink' to='/spots/new'>Create a New Spot</NavLink>
            </div>

            <div className="current-spot">
                {current.map(spot => (
                    <div key={spot.id}>
                    <NavLink to={`/spots/${spot.id}`} style={{textDecoration: 'none'}} >
                        <div className='single-spot'>
                            <img src={spot.previewImage} alt='preview'/>
                        </div>
                    </NavLink>
                    <div className="under-image">
                                    <span>
                                        {spot.city}, {spot.state}
                                    </span>
                                    <span>
                                        <i className="fa-solid fa-star"></i>
                                        {spot.avgRating}
                                    </span>
                                </div>

                                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                        <div>
                                            <span>${spot.price} night</span>
                                        </div>
                                        <div>
                                            <Link to={`/spot/${spot.id}/edit`} style={{textDecoration: 'none'}}className='buttons'>Update</Link>
                                            <Link to='/spots' style={{textDecoration: 'none',marginLeft: '5px'}} className='buttons'>Delete</Link>
                                        </div>
                                    </div>
                </div>

                ))}
            </div>
        </div>
    ): <div>Loading...</div>
}

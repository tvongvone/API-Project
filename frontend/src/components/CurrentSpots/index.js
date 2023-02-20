
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect, Link } from 'react-router-dom';
import { getCurrentSpots } from '../../store/allSpots';
import './CurrentSpots.css'
import OpenModalButton from '../OpenModalButton';
import DeleteComponent from './DeleteComponent'

export default function CurrentSpots() {
    const dispatch = useDispatch();
    const data = useSelector(state => state.spots)
    const user = useSelector(state => state.session.user)

    const current = Object.values(data.currentSpots)

    useEffect(() => {
        dispatch(getCurrentSpots())
    }, [dispatch])

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
                    <div className='current-single-spot' key={spot.id}>
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
                                        {spot.avgRating ? spot.avgRating: <span>New</span>}
                                    </span>
                                </div>

                                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                        <div>
                                            <span>${spot.price} night</span>
                                        </div>
                                        <div>
                                            <Link to={`/spot/${spot.id}/edit`} style={{textDecoration: 'none'}}className='buttons'>Update</Link>
                                            <OpenModalButton styleOption={{backgroundColor: 'dodgerblue', color: 'white', boxShadow: '3px 3px 3px black', position: 'relative', bottom: '1px'}} modalComponent={spot.id && (<DeleteComponent spotId={spot.id}/>)} buttonText='Delete'/>
                                        </div>
                                    </div>
                </div>

                ))}
            </div>
        </div>
    ): <div style={{display: 'flex', margin: '100px', fontFamily:'cursive'}}>You currently have no spots!</div>
}

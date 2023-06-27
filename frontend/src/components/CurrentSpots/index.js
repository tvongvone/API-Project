
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { getCurrentSpots, removeSingleSpot } from '../../store/allSpots';
import './CurrentSpots.css'
import OpenModalButton from '../OpenModalButton';
import DeleteComponent from './DeleteComponent'

export default function CurrentSpots() {
    const history = useHistory();
    const dispatch = useDispatch();
    const data = useSelector(state => state.spots)
    const user = useSelector(state => state.session.user)

    const current = Object.values(data.currentSpots)

    const onClickHander = (spotId) => {
        // onClickHander(spotId) {
        //     return <Redirect to={`/spot/${spotIdd}/edit`} />
        // }
       return history.push(`/spot/${spotId}/edit`)
    }

    useEffect(() => {
        dispatch(getCurrentSpots())

        return () => {
            dispatch(removeSingleSpot())
        }
    }, [dispatch])

    if(!user) {
        return <Redirect to='/' />
    }


    return current.length ? (
        <div className='current-container'>
            <div style={{display:'flex', flexDirection: 'column'}}>
                <h1>Manage Your Spots</h1>
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
                                            <button onClick={() => onClickHander(spot.id)} className='buttons'>Update</button>
                                            <OpenModalButton styleOption={{backgroundColor: 'dodgerblue', color: 'white'}} modalComponent={spot.id && (<DeleteComponent spotId={spot.id}/>)} buttonText='Delete'/>
                                        </div>
                                    </div>
                </div>

                ))}
            </div>
        </div>
    ): <div style={{display: 'flex', margin: '100px'}}>You currently have no spots!</div>
}

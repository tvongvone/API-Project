import { useSelector} from 'react-redux'
import { NavLink } from 'react-router-dom'
import './Spots.css'


export default function Spots() {
    const spotsData = useSelector(state => state.spots)

    const spots = Object.values(spotsData.allSpots)
    spots.sort((a, b) => -1)

    return spots.length ? (
        <div className='spot-container'>
            <div className='spot-content'>
            {spots.map(spot => (
                <div className="spot-single-spot"key={spot.id}>
                    <NavLink to={`/spots/${spot.id}`} style={{textDecoration: 'none'}} >
                        <div className='single-spot'>
                            <img className='all-images' src={spot.previewImage} alt='preview'/>

                                <div className="under-image">
                                    <span>
                                        {spot.city}, {spot.state}
                                    </span>
                                    <span style={{display: 'flex'}}>
                                        <i className="fa-solid fa-star"></i>
                                        {spot.avgRating && (!isNaN(spot.avgRating))? spot.avgRating : <span style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>New</span>}
                                    </span>
                                </div>
                                <span>${spot.price} night</span>

                        </div>
                    </NavLink>
                </div>
            ))}
            </div>
        </div>
    ): <div>Sorry could not retrieve spots at this time!!!</div>
}

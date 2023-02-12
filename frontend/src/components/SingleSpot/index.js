import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getSingleSpot } from "../../store/singleSpot";
import './SingleSpot.css'

export default function SingleSpot() {
    const {id} = useParams()
    const dispatch = useDispatch()
    const singleSpot = useSelector(state => state.singleSpot)

    useEffect(() => {
        dispatch(getSingleSpot(id))
    }, [dispatch, id])

    return singleSpot && singleSpot.SpotImages && (
        <div className="container">
            <div className="single-spot-container">
                <h2>{singleSpot.name}</h2>
                <h3>{singleSpot.city}, {singleSpot.state}, {singleSpot.country}</h3>
                <div className='the-images'>
                    <img className='first-image'src={singleSpot.SpotImages[0].url} alt="N/A"/>
                    {
                        singleSpot.SpotImages.slice(1).map(image => (
                            <img className='side-images' key={image.id} src={image.url} alt="N/A" />
                        ))
                    }
                </div>
                <div className='spot-info-container'>
                    <div className='spot-info'>
                        <h2>Hosted by {singleSpot.Owner.firstName} {singleSpot.Owner.lastName}</h2>
                        <p>{singleSpot.description}</p>
                    </div>
                    <div className='spot-rating'>
                        <h2>${singleSpot.price} <span style={{fontSize: '15px'}}>night</span></h2>
                        <div>{singleSpot.Reviews[0].avgRating}</div>
                    </div>
                </div>
                {}
            </div>
        </div>
    )
}

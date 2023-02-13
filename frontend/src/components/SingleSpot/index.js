import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getSpotReviews } from "../../store/reviews";
import { getSingleSpot } from "../../store/singleSpot";
import './SingleSpot.css'

export default function SingleSpot() {
    const {id} = useParams()
    const dispatch = useDispatch()
    const singleSpot = useSelector(state => state.singleSpot)
    const reviewsData = useSelector(state => state.reviews)
    const reviews = Object.values(reviewsData.spots)

    console.log(reviews)

    useEffect(() => {
        dispatch(getSingleSpot(id))
        dispatch(getSpotReviews(id))
    }, [dispatch, id])

    return singleSpot && singleSpot.spotImages &&(
        <div className="container">
            <div className="single-spot-container">
                <h2>{singleSpot.name}</h2>
                <h3>{singleSpot.city}, {singleSpot.state}, {singleSpot.country}</h3>
                <div className='the-images'>
                    <img className='first-image'src={singleSpot.spotImages[0].url} alt="N/A"/>
                    {
                        singleSpot.spotImages.slice(1).map(image => (
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
                        <div className="hotdog">
                            {reviews.length ? <p><i className="fa-solid fa-star"></i>{singleSpot.Reviews[0].avgRating} {reviews.length} reviews</p> :
                            <p><i className="fa-solid fa-star"></i>New</p>}
                        </div>
                    </div>
                </div>
                <div className='reviews-container'>
                    <h3><i className="fa-solid fa-star"></i> {singleSpot.Reviews[0].avgRating} <span style={{marginLeft: '10px'}}>{reviews.length} reviews</span></h3>
                    {reviews.map(review => (
                        <div key={review.id} className='reviews'>
                            <h4>{review.User.firstName}</h4>
                            <span>{review.createdAt.slice(0, 10)}</span>
                            <p>{review.review}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

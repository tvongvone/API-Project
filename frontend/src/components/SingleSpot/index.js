import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { deleteSingleReview, getSpotReviews } from "../../store/reviews";
import { getAllSpots, getSingleSpot, removeSingleSpot } from "../../store/allSpots";
import OpenModalButton from '../OpenModalButton'
import Review from './Review'
import './SingleSpot.css'

export default function SingleSpot() {
    const {id} = useParams()
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const singleSpot = useSelector(state => state.spots.singleSpot)
    const reviewData = useSelector(state => state.reviews.spot)
    const allSpots = useSelector(state => state.spots.allSpots)
    const reviews = Object.values(reviewData)

    const userArray = reviews.map(ele => ele.User.id)

    const singleData = allSpots[id]

    const num = reviews.reduce((acc, ele) => {
        return (ele.stars + acc)
    }, 0)

    const final = parseFloat((num / reviews.length)).toFixed(1)

    useEffect(() => {
        dispatch(getSingleSpot(id))
        dispatch(getSpotReviews(id))
        return () => {
            dispatch(removeSingleSpot())
            dispatch(getAllSpots())
            // dispatch(clearReview())
        }
    }, [dispatch, id])

    const deleteHandler = (id) => {
        dispatch(deleteSingleReview(id))
    }

    return singleSpot && singleSpot.SpotImages && singleData && userArray ? (
        <div className="container">
            <div className="single-spot-container">
                <h2>{singleSpot.name}</h2>
                <h3>{singleSpot.city}, {singleSpot.state}, {singleSpot.country}</h3>
                <div className='the-images'>
                    <img className='first-image'src={singleData.previewImage} alt="N/A"/>
                    {
                        singleSpot.SpotImages.map(image => (
                            image.preview === false && (<img className='side-images' key={image.id} src={image.url} alt="N/A" />)
                        ))
                    }
                </div>
                <div className='spot-info-container'>
                    <div className='spot-info'>
                        <h2>Hosted by {singleSpot.Owner?.firstName} {singleSpot.Owner?.lastName}</h2>
                        <p style={{overflow: 'auto', fontFamily: 'cursive'}}>{singleSpot.description}</p>
                    </div>
                    <div className='spot-rating'>
                        <h2>${singleSpot.price} <span style={{fontSize: '15px'}}>night</span></h2>
                        <div className="hotdog">
                            {reviews.length === 1 ? <p><i className="fa-solid fa-star"></i>{final} {reviews.length} review</p> :
                            reviews.length ? <p><i className="fa-solid fa-star">{final} {reviews.length}</i> reviews</p> : <p><i className="fa-solid fa-star"></i>New</p>}
                        </div>
                    </div>
                </div>
                <div className='reviews-container'>
                    {reviews.length && final ? (
                    <>
                    <h3><i className="fa-solid fa-star"></i> {final} <span style={{marginLeft: '10px'}}>{reviews.length} {reviews.length === 1 ? 'review': 'reviews'}</span></h3>
                    {sessionUser &&
                    sessionUser?.id !== singleSpot.ownerId && !userArray.includes(sessionUser?.id) && (<OpenModalButton modalComponent={<Review />} buttonText={'Post Your Review'} />)
                    }
                    {reviews.map(review => (
                        <div key={review.id} className='reviews'>
                            <h4>{review.User.firstName}</h4>
                            <span>{review.createdAt.slice(0, 10)}</span>
                            <p>{review.review}</p>
                            {(review.userId === sessionUser?.id) && (
                                <button onClick={() => deleteHandler(review.id)} style={{backgroundColor: 'lightcoral', color: 'white'}}>Delete</button>
                            )}
                        </div>
                    ))}
                    </>
                    ):
                    <>
                    <h3><i className="fa-solid fa-star"></i> New</h3>
                    {sessionUser && sessionUser?.id !== singleSpot.ownerId && (<OpenModalButton modalComponent={<Review />} buttonText={'Post Your Review'} />)}
                    <p>Be the first to post a review!</p>
                    </>
                    }
                </div>
            </div>
        </div>
    ):
    <div>Loading...</div>
}

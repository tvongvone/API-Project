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

    reviews.sort((a, b) => -1)

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
                    <div className="the-images">
                        <div className='first-image'>
                            <img src={singleData.previewImage} alt="N/A"/>
                        </div>
                        <div  className="side-container">
                                {singleSpot.SpotImages.map(image => (
                                    image.preview === false && (<div key={image.id} className='side-images'><img style={{border: 'solid black 3px'}} key={image.id} src={image.url} alt="N/A" /></div>)
                                ))}
                        </div>
                    </div>
                <div className='spot-info-container'>
                    <div className='spot-info'>
                        <h2>Hosted by {singleSpot.Owner?.firstName} {singleSpot.Owner?.lastName}</h2>
                        <p style={{overflowWrap: 'break-word', fontFamily: 'cursive'}}>{singleSpot.description}</p>
                    </div>
                    <div className='spot-rating'>
                        <div style={{display: 'flex', justifyContent: 'space-between', width: '80%'}}>
                            <h2>${singleSpot.price} <span style={{fontSize: '15px'}}>night</span></h2>
                            <div className="hotdog">
                                {reviews.length === 1 ? <p><i className="fa-solid fa-star"></i>{final} <i style={{ marginLeft: '5px', marginRight: '3px' ,fontSize: '5px', verticalAlign: 'middle'}} className="fa-solid fa-circle"></i> {reviews.length} review</p> :
                                reviews.length ? <p><i className="fa-solid fa-star"> <span style={{fontWeight: '400',fontFamily: 'cursive'}}>{final}</span> <i style={{ marginLeft: '5px', marginRight: '3px', fontSize: '8px', verticalAlign: 'middle'}} className="fa-solid fa-circle"></i></i>{reviews.length} reviews</p> : <p><i className="fa-solid fa-star"></i>New</p>}
                            </div>
                        </div>
                        <button onClick={() => alert('Feature coming soon!')}>Reserve</button>
                    </div>
                </div>
                <div className='reviews-container'>
                    {reviews.length && final ? (
                    <>
                    <h3><i className="fa-solid fa-star"></i>{final} <i style={{ verticalAlign:'middle' ,marginLeft: '10px', fontSize: '8px'}} class="fa-solid fa-circle"></i> <span style={{marginLeft: '10px'}}>{reviews.length} {reviews.length === 1 ? 'review': 'reviews'}</span></h3>
                    {sessionUser &&
                    sessionUser?.id !== singleSpot.ownerId && !userArray.includes(sessionUser?.id) && (<OpenModalButton styleOption={{backgroundColor: 'dodgerblue', color: 'white', padding: '4px', borderRadius: '10px', boxShadow: '3px 3px 3px black'}} modalComponent={<Review />} buttonText={'Post Your Review'} />)
                    }
                    {reviews.map(review => (
                        <div key={review.id} className='reviews'>
                            <h4>{review.User.firstName}</h4>
                            <span>{review.createdAt.slice(0, 10)}</span>
                            <p>{review.review}</p>
                            {(review.userId === sessionUser?.id) && (
                                <button onClick={() => deleteHandler(review.id)} style={{backgroundColor: 'dodgerblue', color: 'white'}}>Delete</button>
                            )}
                        </div>
                    ))}
                    </>
                    ):
                    <>
                    <h3><i className="fa-solid fa-star"></i> New</h3>
                    {sessionUser && sessionUser?.id !== singleSpot.ownerId && (<OpenModalButton styleOption={{backgroundColor: 'dodgerblue', color: 'white', padding: '4px', borderRadius: '10px', boxShadow: '3px 3px 3px black'}} modalComponent={<Review />} buttonText={'Post Your Review'} />)}
                    <p>Be the first to post a review!</p>
                    </>
                    }
                </div>
            </div>
        </div>
    ):
    <div>Loading...</div>
}

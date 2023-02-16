import React, { useState } from "react"
import ReactStars from "react-rating-stars-component"
import { useDispatch, useSelector } from "react-redux"
import './Review.css'
import { useModal } from "../../../context/Modal"
import { createSingleReview } from "../../../store/reviews"


export default function Review() {

    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.singleSpot)

    const {closeModal} = useModal();

    const [review, setReview] = useState('')
    const [stars, setStars] = useState(1)
    const [errors, setErrors] = useState('')

    const submitHandler = async () => {
        dispatch(createSingleReview(spot.id, {review, stars})).then(closeModal)
    }


    return (
        <div className="review-container">
            <div className="review-content">
                <h2>How was your stay?</h2>
                {errors && (
                    <ul>
                        {errors.map(e => (
                            <li>{e}</li>
                        ))}
                    </ul>
                )}
                <textarea placeholder="Just a quick review." value={review} onChange={e => setReview(e.target.value)} />

                <div>
                <ReactStars size={20} count={5} isHalf={false} activeColor='lightcoral' color='black'
                emptyIcon={<i className="far fa-star" />}
                filledIcon={<i className="fa fa-star" />} value={stars} onChange={e => setStars(e)}/>
                </div>
                <button onClick={submitHandler}>Submit Your Review</button>

            </div>

        </div>
    )
}

import {useState} from 'react'
import {useDispatch} from 'react-redux'
import { createSpotBooking } from '../../store/bookings';
import { useEffect } from 'react';
import './PickDate.css'
import { useParams } from "react-router";


const PickDate = ({price, spotId}) => {
    const dispatch = useDispatch();

    const [startDate, setStart] = useState('')
    const [endDate, setEnd] = useState('')
    const [days, setDays] = useState('')
    const [total, setTotal] = useState()
    const [validationErrors, setErrors] = useState([])
    const [hasSubmitted, setSubmitted] = useState(false)


    const submitHandler = async (e) => {
        e.preventDefault();
        setSubmitted(true)

        const data = await dispatch(createSpotBooking(spotId, {startDate, endDate}))

        if(data) {
            setErrors([data])
        } else {
            setErrors([])
            setStart('')
            setEnd('')
            setSubmitted(false)
        }

    }

    useEffect(() => {
        const errors = []
        if (!startDate.length) errors.push('Please enter a start-date')
        if(!endDate.length) errors.push('Please enter a end-date')
        setErrors(errors)

        if(startDate && endDate) {
            const start = new Date(startDate)
            const end = new Date(endDate)

            const timeDiff = Math.abs(end - start)

            const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))

            setDays(diffDays)
            setTotal(price * diffDays)
        }
    }, [startDate, endDate])

    return (
        <div className='date-container'>
            <div className='date-content'>
                <h3 style={{fontSize: '30px'}}>Choose a time range</h3>
                {hasSubmitted && validationErrors.length > 0 && (
                        <div className='errors-info'>
                            <ul>
                                {validationErrors.map(error => (
                                <li key={error}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                <form onSubmit={submitHandler}>
                    <div style={{display:'flex', padding: '10px', flexDirection: 'column'}}>
                        <div className='label-content'>
                            <label className="random" htmlFor="startDate">Start Date</label>
                            <input className='date-label' id="startDate" type="date" value={startDate} onChange={e => setStart(e.target.value)}></input>
                        </div>

                        <div className='label-content'>
                            <label className='random' htmlFor="endDate">End Date</label>
                            <input className='date-label' id="endDate" type="date" value={endDate} onChange={e => setEnd(e.target.value)}></input>
                        </div>

                        <button style={{border: 'none', backgroundColor: 'dodgerblue', color: 'white', padding: '5px 10px', marginLeft: '100px'}} type='submit'>Book</button>
                    </div>
                </form>
            </div>
            <div className='price-content'>
                <div className='price'>
                        <h3>Price details</h3>
                        <span>{price} per night</span>
                            <span>x</span>
                        {total && (
                            <>
                            <span>{days} days</span>
                            </>
                        )}
                </div>
            </div>
        </div>
    )
}

export default PickDate

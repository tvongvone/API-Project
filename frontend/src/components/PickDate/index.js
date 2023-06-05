import {useState} from 'react'
import {useDispatch} from 'react-redux'
import { createSpotBooking } from '../../store/bookings';
import { useEffect } from 'react';

const PickDate = ({spotId}) => {
    const dispatch = useDispatch();

    const [startDate, setStart] = useState('')
    const [endDate, setEnd] = useState('')
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
    }, [startDate, endDate])

    return (
        <div>
            <h2>Booking</h2>
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
                <label htmlFor="startDate">Start Date</label>
                <input id="startDate" type="date" value={startDate} onChange={e => setStart(e.target.value)}></input>

                <label htmlFor="endDate">End Date</label>
                <input id="endDate" type="date" value={endDate} onChange={e => setEnd(e.target.value)}></input>

                <button type='submit'>Book</button>
            </form>
        </div>
    )
}

export default PickDate

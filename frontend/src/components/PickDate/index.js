import {useState} from 'react'
import {useDispatch} from 'react-redux'
import { createSpotBooking } from '../../store/bookings';
import { useEffect } from 'react';
import './PickDate.css'
import { useParams } from "react-router";


const PickDate = () => {
    const dispatch = useDispatch();

    const {id} = useParams();
    const [startDate, setStart] = useState('')
    const [endDate, setEnd] = useState('')
    const [validationErrors, setErrors] = useState([])
    const [hasSubmitted, setSubmitted] = useState(false)

    const submitHandler = async (e) => {
        e.preventDefault();
        setSubmitted(true)

        const data = await dispatch(createSpotBooking(id, {startDate, endDate}))

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
        <div className='date-container'>
            <div className='date-content'>
                <h2 style={{fontSize: '30px'}}>Choose a time range</h2>
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

                        <button type='submit'>Book</button>
                    </div>
                </form>
            </div>
            <div className='date-right'>

            </div>
        </div>
    )
}

export default PickDate

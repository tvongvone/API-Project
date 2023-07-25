import {useState} from 'react'
import {useDispatch} from 'react-redux'
import { createSpotBooking } from '../../store/bookings';
import { useEffect } from 'react';
import './PickDate.css'


const PickDate = ({price, spotId}) => {
    const dispatch = useDispatch();

    const [startDate, setStart] = useState('')
    const [endDate, setEnd] = useState('')
    const [days, setDays] = useState('')
    const [total, setTotal] = useState('')
    const [showDate, setShow] = useState(false)
    const [validationErrors, setErrors] = useState([])
    const [hasSubmitted, setSubmitted] = useState(false)


    const submitHandler = async (e) => {
        e.preventDefault();
        setSubmitted(true)

        const data = await dispatch(createSpotBooking(spotId, {startDate, endDate}))

        if(data) {
            setErrors([data])
        } else {
            setShow(true)
            setErrors([])
            // setStart('')
            // setEnd('')
            // setSubmitted(false)
        }

    }

    // console.log(new Date(startDate).toDateString())

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
    }, [startDate, endDate, price])

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
                            <input disabled={showDate} className='date-label' id="startDate" type="date" value={startDate} onChange={e => setStart(e.target.value)}></input>
                        </div>

                        <div className='label-content'>
                            <label className='random' htmlFor="endDate">End Date</label>
                            <input disabled={showDate} className='date-label' id="endDate" type="date" value={endDate} onChange={e => setEnd(e.target.value)}></input>
                        </div>

                        <button disabled={showDate} style={{border: 'none', backgroundColor: 'dodgerblue', color: 'white', padding: '5px 10px', marginLeft: '100px'}} type='submit'>Book</button>

                        {showDate && (
                            <div style={{marginTop: '20px', padding: '5px'}}>
                                <p>Successfully booked for {new Date(startDate).toDateString()}</p>
                                <p> to {new Date(endDate).toDateString()}!</p>
                            </div>
                        )}
                    </div>
                </form>
            </div>
            <div className='price-content'>
                <div className='price'>
                        <h3 style={{fontSize: '25px', marginBottom: '20px', marginTop: '10px'}}>Price details</h3>
                        <p style={{borderBottom: 'solid 1px black', width: '90%', paddingBottom: '10px'}}>${price} x {days} nights</p>
                        {total && (
                            <div style ={{width: '80%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px'}}>
                                <span style={{fontWeight: 'bold'}}>Total (USD)</span>
                                <span>${total}</span>
                            </div>

                        )}
                </div>
            </div>
        </div>
    )
}

export default PickDate

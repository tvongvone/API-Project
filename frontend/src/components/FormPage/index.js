import { useDispatch, useSelector } from "react-redux"
import { Redirect, useParams } from "react-router-dom"
import { useState} from "react"
import './FormPage.css'
import {useHistory}from 'react-router-dom'
import { createSingleSpot,postPreviewImage, updateOneSpot } from "../../store/allSpots"

export default function FormPage({spot, formType}) {
    const {id} = useParams()
    const currentUser = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const history = useHistory();

    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [country, setCountry] = useState(spot.country)
    const [address, setAddress] = useState(spot.address)
    const [city, setCity] = useState(spot.city)
    const [state, setState] = useState(spot.state)
    const [lat, setLatitude] = useState(spot.lat)
    const [lng, setLongitude] = useState(spot.lng)
    const [name, setName] = useState(spot.name)
    const [description, setDescription] = useState(spot.description)
    const [price, setPrice] = useState(spot.price)
    const [previewImage, setPreviewImage] = useState(spot.previewImage)
    const [a, setA] = useState(false)
    const [errors, setErrors] = useState([])


    if(!currentUser) {
        return (
        <Redirect to='/' />
        )
    }


    const submitHandler = async e => {
        e.preventDefault()
        setErrors([])

        setA(true)

        setHasSubmitted(true)

        if(formType === 'Edit') {

            try{

            const response = await dispatch(updateOneSpot({country, address, city, state, lat: +lat, lng: +lng, name,  description, price: +price}, id))


            history.push(`/spots/${id}/`)

            } catch(e) {
                // const error = await e.json()
                setErrors(oldArray => [...oldArray])
                console.log(errors)
            }

        }

        else {
            if(previewImage.endsWith('.jpg') || previewImage.endsWith('.jpeg')) {
                setA(false)
                try {
                            const response = await dispatch(createSingleSpot({country, address, city, state, lat: +lat, lng: +lng, name,  description, price: +price}))

                            dispatch(postPreviewImage({id: response.id, url: previewImage}))

                            history.push(`/spots/${response.id}/`)

                    }   catch(e) {
                        const error = await e.json()
                        setErrors(oldArray => [...oldArray, ...error.errors])

                    }
            } else {
                setErrors(old => [...old, 'previewError'])
            }
        }



    }

    return (
        <div className='create-container'>
           <div className="create-content">
                <h2>{formType} a new Spot</h2>

                <form className="the-form" onSubmit={submitHandler}>
                    <div>
                        <h3>Where's your place located?</h3>
                        <p>Guests will only get your exact address once they booked a reservation.</p>

                        <label htmlFor="country">Country <span className={hasSubmitted && (!country.length) ? "" && setErrors(o => [...o, 'country']): "hidden"} style={{ color: 'red'}}> Country is required</span></label>


                        <input id="country" name="country" type='text' placeholder="Country" value={country} onChange={e => setCountry(e.target.value)}/>
                        <label htmlFor="address">Street Address <span className={hasSubmitted && (!address.length) ? "" && setErrors(o => [...o, 'address']): "hidden"} style={{ color: 'red'}}> Address is required</span></label>
                        <input id="address" name="address" type='text' placeholder="Address" value={address} onChange={e => setAddress(e.target.value)}/>
                        <label htmlFor="city">City <span className={hasSubmitted && (!city.length) ? "" && setErrors(o => [...o, 'city']): "hidden"} style={{ color: 'red'}}> City is required</span></label>
                        <input id="city" name="city" value={city} type='text' placeholder="City" onChange={e => setCity(e.target.value)}/>
                        <label htmlFor="state">State <span className={hasSubmitted && (!state.length) ? "" && setErrors(o => [...o, 'state']): "hidden"} style={{ color: 'red'}}> State is required</span></label>
                        <input id="state" name="state" value={state} type='text' placeholder="State" onChange={e => setState(e.target.value)}/>
                        <label htmlFor="latitude">Latitude</label>
                        <input id="latitude" name="latitude" value={lat} placeholder="Latitude" type='number' onChange={e => setLatitude(e.target.value)}/>
                        <label htmlFor="longitude">Longitude</label>
                        <input id="longitude" name="longitude" value={lng} placeholder="Longitude" type='number' onChange={e => setLongitude(e.target.value)}/>
                    </div>
                    <div>
                        <h3>Describe your place to guests</h3>
                        <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                        <div style={{display:'flex', flexDirection: 'column'}}>
                        <span className={hasSubmitted && (description.length < 30) ? "" && setErrors(o => [...o, 'description']): "hidden"} style={{ color: 'red'}}> Description is needs a minimum of 30 characters.</span>
                        <textarea id="description" name="description" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)}/>
                        </div>
                    </div>
                    <div>
                        <h3>Create a title for your spot</h3>
                        <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                        <span className={hasSubmitted && (!name.length) ? "" && setErrors(o => [...o, 'name']): "hidden"} style={{ color: 'red'}}> Name is required </span>
                        <input id='name' name='name' placeholder="name" value={name} type="text" onChange={e => setName(e.target.value)}/>
                    </div>
                    <div>
                        <h3>Set a base price for your spot</h3>
                        <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                        <span className={hasSubmitted && !price ? "" : "hidden"} style={{ color: 'red'}}> Price is required </span>
                        <div style={{display:'flex'}}>

                        <span className='dollar-sign'>$ <input id="price" name="price" placeholder="Price" value={price} type="number" onChange={e => setPrice(e.target.value)}/></span>
                        </div>
                    </div>
                    {formType === 'Create' && (
                        <div>
                        <h2>Liven up your spot with photos</h2>
                        <p>Submit a link to at least one photo to publish your spot.</p>
                        <span className={hasSubmitted && a === true ? "" : "hidden"} style={{color: 'red'}}>Preview Image is Required. Must end in .jpg, .jpeg, or .png</span>
                        <input className='required-image' id="previewImage" name="previewImage" placeholder="Preview Image URL" type='url' value={previewImage} onChange={e => setPreviewImage(e.target.value)}/>
                        {/* <input  id="image2" name="image2" placeholder="Image URL" type='url' />
                        <input  id="image3" name="image3" placeholder="Image URL" type='url' />
                        <input  id="image4" name="image4" placeholder="Image URL" type='url' />
                        <input  id="image5" name="image5" placeholder="Image URL" type='url' /> */}
                    </div>
                    )}
                    <button type="submit">{formType} Spot</button>
                </form>
           </div>
        </div>
    )
}

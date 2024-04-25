
import FormPage from "../FormPage";
// import { useState } from "react";




export default function CreateSpot() {
    // const [country, setCountry] = useState("")
    // const [address, setAddress] = useState("")
    // const [city, setCity] = useState("")
    // const [state, setState] = useState("")
    // const [latitude, setLatitude] = useState("")
    // const [longitude, setLongitude] = useState("")
    // const [name, setName] = useState("")
    // const [description, setDescription] = useState("")
    // const [price, setPrice] = useState("")
    // const [previewImage, setPreviewImage] = useState("")

    const spot = {country: "", address: "", city: "", state: "", lat: "", lng: "", name: "", description: "", price: "", previewImage: ""}
    return spot ? (
        <FormPage spot={spot} formType='Create'/>
<<<<<<< HEAD
    ): <div>This would be an error</div>
=======
    ): <div></div>
>>>>>>> 89c8c1e36aad18cf0366a41de4400b033856b374
}

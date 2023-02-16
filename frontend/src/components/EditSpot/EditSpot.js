import { useParams } from "react-router-dom"
import {  getSingleSpot } from "../../store/allSpots"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import FormPage from "../FormPage"


export default function EditSpot() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const spotData = useSelector(state => state.spots.singleSpot)
    // const spotAll = useSelector(state => state.spots.allSpots)

    useEffect(() => {
        dispatch(getSingleSpot(id))
    }, [dispatch, id])

    return spotData.id && (
        <FormPage spot={spotData} formType='Edit'/>
    )
}

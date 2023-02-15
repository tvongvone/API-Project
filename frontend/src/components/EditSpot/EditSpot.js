import { useParams } from "react-router-dom"
import { getSingleSpot } from "../../store/allSpots"
import CreateSpot from "../CreateSpot"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"


export default function EditSpot() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const spot = useSelector(state => state.spots.singleSpot)

    useEffect(() => {
        dispatch(getSingleSpot(id))
    }, [dispatch, id])

    return spot && (
        <CreateSpot spot={spot} formType='Edit'/>
    )
}

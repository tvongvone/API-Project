import { useDispatch, useSelector } from "react-redux"
import { deleteSingleSpot } from "../../../store/allSpots"
import { useModal } from "../../../context/Modal"
import './DeleteComponent.css'

export default function DeleteSpot() {
    const singleSpot = useSelector(state => state.spots.singleSpot)
    const dispatch = useDispatch()
    const {closeModal} = useModal()

    const yesString = 'Yes (Delete Spot)'
    const noString = 'No (Keep Spot)'

    const yesSubmit = () => {
       dispatch(deleteSingleSpot(singleSpot.id)).then(closeModal)
    }

    const noSubmit = () => {
        closeModal()
    }

    return (
        <div className="delete-container">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this spot from the listings</p>
            <div>
                <div className='del-container'>
                    <button className='delete-buttons' onClick={yesSubmit}>{yesString}</button>
                    <button className='delete-buttons' onClick={noSubmit}>{noString}</button>
                </div>
            </div>

        </div>
    )
}

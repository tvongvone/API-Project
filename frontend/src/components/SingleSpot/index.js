import { useSelector } from "react-redux";
import { useParams } from "react-router";

export default function SingleSpot() {
    const {id} = useParams()
    const singleSpot = useSelector(state => state.spots[id])

    return singleSpot && (
        <div>This is a single spot</div>
    )
}

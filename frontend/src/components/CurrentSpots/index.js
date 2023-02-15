// import { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux'
// import { getCurrentSpots } from '../../store/allSpots';

// import './CurrentSpots.css'


// export default function CurrentSpots() {
//     const dispatch = useDispatch();
//     const currentData = useSelector(state => state.spots.currentSpots)
//     const currentSpots = Object.values(currentData)

//     console.log(currentSpots)


//     useEffect(() => {
//         dispatch(getCurrentSpots())
//     }, [dispatch])

//     return (
//         <div className="current-container">
//             <div className="current-info"></div>
//         </div>
//     )
// }

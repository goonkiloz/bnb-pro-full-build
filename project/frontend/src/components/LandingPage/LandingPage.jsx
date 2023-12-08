import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { getAllSpots } from "../../store/spots"
import './LandingPage.css'

function LandingPage() {
    const dispatch = useDispatch();

    const spots = useSelector((state) => state.spot)
    const spotList = Object.values(spots)

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    return (
        <div className="mainDiv">
        <h1 className="spotHead">Spots</h1>
        {spotList?.map(({id, previewImage, city, state, avgRating, description, name}) => {
            return (
            <div key={id} className="spotdiv">
                <img src={previewImage}/>
                <h2>{`${city}, ${state}`}</h2>
                <h1>{name}</h1>
                <span>{avgRating}</span>
            </div>
            )
        })}
        </div>
    )
}

export default LandingPage

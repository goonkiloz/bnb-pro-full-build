import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { getAllSpots } from "../../store/spots"

function LandingPage() {
    const dispatch = useDispatch();

    const spots = useSelector((state) => state.spot)
    const spotList = Object.values(spots)

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    return (
        <div className="maindiv">
        <h1>Spots</h1>
        {spotList?.map(({id, name}) => {
            <div key={id} className="spotdiv">
                <h1>{name}</h1>
            </div>
        })}
        </div>
    )
}

export default LandingPage

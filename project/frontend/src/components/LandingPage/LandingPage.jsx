import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { getAllSpots, getSpot } from "../../store/spots"
import './LandingPage.css'
import { useNavigate } from "react-router-dom";

function LandingPage() {
    const dispatch = useDispatch();

    const spots = useSelector((state) => state.spots)
    const spotList = Object.values(spots)

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    const navigate = useNavigate()

    return (
        <>
            <h1 className="spotHead">Spots</h1>
            <div className="spotGrid">
            {spotList?.map(({id, previewImage, name, city, state, price, avgRating}) => {
                return (
                <div key={id} className={'spotDiv'} title={name}>
                        <img src={previewImage} className="spotImg" onClick={() => dispatch(getSpot(id)) && navigate(`/spots/${id}`)} />
                        <div className="spotInfo">
                            <p className="location">{`${city}, ${state}`}</p>
                            <h2 className="rating"><span>&#9733;</span> {avgRating}</h2>
                            <p className="price">{<span className="priceText">${price}</span>} /Night</p>
                        </div>
                </div>
                )
            })}
            </div>
        </>
    )
}

export default LandingPage

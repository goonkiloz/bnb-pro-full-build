import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { getAllSpots } from "../../store/spots"
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
            <div className="spotGrid">
            {spotList?.map(({id, previewImage, name, city, state, price, avgRating}) => {

                if(avgRating === 0) {
                    return (
                        <div key={id} className={'spotDiv'} title={name} onClick={() => navigate(`/spots/${id}`)}>
                                <img src={previewImage} className="spotImg" />
                                <div className="spotInfo">
                                    <p className="location">{`${city}, ${state}`}</p>
                                    <h2 className="rating"><span>&#9733;</span> New</h2>
                                    <p className="price">{<span className="priceText">${price}</span>} /Night</p>
                                </div>
                        </div>
                        )
                } else {
                    return (
                        <div key={id} className={'spotDiv'} title={name} onClick={() => navigate(`/spots/${id}`)}>
                                <img src={previewImage} className="spotImg"  />
                                <div className="spotInfo">
                                    <p className="location">{`${city}, ${state}`}</p>
                                    <h2 className="rating"><span>&#9733;</span> {parseFloat(avgRating).toFixed(1)}</h2>
                                    <p className="price">{<span className="priceText">${price}</span>} /Night</p>
                                </div>
                        </div>
                        )
                }
            })}
            </div>
        </>
    )
}

export default LandingPage

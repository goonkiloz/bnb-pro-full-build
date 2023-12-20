import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserSpots, getSpot } from "../../store/spots";
import './ManageSpot.css'
import { useNavigate } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteSpotModal from "./DeleteSpotModal";

function ManageSpotsPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const spotState = useSelector((state) => state.spots)

    const userState = useSelector((state) => state.session.user)

    const spotList = Object.values(spotState)

    useEffect(() => {
        dispatch(getUserSpots())
    }, [dispatch])

    const spotCheck = () => {
        const userId = userState.id

        const spotOwners = []

        spotList.forEach((spot) => {
            spotOwners.push(spot.ownerId)
        })

        if(spotOwners.includes(userId)) {
            return true
        }

        return false
    }

    if(spotCheck()) {

        return (
            <>
                <h1 className="manageSpotHead">Manage Spots</h1>
                <div className="spotGrid">
                {spotList?.map(({id, previewImage, name, city, state, price, avgRating}) => {

                    if(avgRating === 0) {
                        return (
                            <div key={id} className={'manageSpotDiv'} title={name}>
                                    <img src={previewImage} className="spotImg" onClick={() => dispatch(getSpot(id)) && navigate(`/spots/${id}`)} />
                                    <div className="spotInfo">
                                        <p className="location">{`${city}, ${state}`}</p>
                                        <h2 className="rating"><span>&#9733;</span> New</h2>
                                        <p className="price">{<span className="priceText">${price}</span>} /Night</p>
                                    </div>
                                    <div className="buttonDiv">
                                    <button className="updateButton" onClick={() => navigate(`/spots/${id}/update`)}>Update</button>
                                        <OpenModalButton
                                            buttonText={'Delete'}
                                            modalComponent={<DeleteSpotModal spotId={id}/>}
                                        />
                                    </div>
                            </div>
                            )
                    } else {
                        return (
                            <div key={id} className={'manageSpotDiv'} title={name}>
                                    <img src={previewImage} className="spotImg" onClick={() => dispatch(getSpot(id)) && navigate(`/spots/${id}`)} />
                                    <div className="spotInfo">
                                        <p className="location">{`${city}, ${state}`}</p>
                                        <h2 className="rating"><span>&#9733;</span> {avgRating}</h2>
                                        <p className="price">{<span className="priceText">${price}</span>} /Night</p>
                                    </div>
                                    <div className="buttonDiv">
                                        <button className="updateButton" onClick={() => navigate(`/spots/${id}/update`)}>Update</button>
                                        <OpenModalButton
                                            buttonText={'Delete'}
                                            modalComponent={<DeleteSpotModal spotId={id}/>}
                                        />
                                    </div>
                            </div>
                            )
                    }
                })}
                </div>
            </>
        )
    } else {
        return (
            <div>
            Create a new spot!
            <button onClick={()=> navigate('/spots/new')}>Create Spot</button>
            </div>
        )
    }


}

export default ManageSpotsPage;

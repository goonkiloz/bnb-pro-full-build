import { useDispatch, useSelector } from "react-redux"
import { useState } from "react";
import { updateSpot } from "../../store/spots";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import '../CreateSpotPage/CreateSpot.css'



function UpdateSpotPage() {
    const dispatch = useDispatch()

    const { spotId } = useParams()

    const spotState = useSelector((state) => state.spots)

    const spot = spotState[spotId]

    const navigate = useNavigate()

    const [country, setCountry] = useState(spot?.country);
    const [address, setAddress] = useState(spot?.address);
    const [city, setCity] = useState(spot?.city);
    const [state, setState] = useState(spot?.state);
    const [latitude, setLatitude] = useState(spot?.lat);
    const [longitude, setLongitude] = useState(spot?.lng);
    const [description, setDescription] = useState(spot?.description);
    const [name, setName] = useState(spot?.name);
    const [price, setPrice] = useState(spot?.price);
    const [errors, setErrors] = useState();


    const handleSubmit = async(e) => {
        e.preventDefault();
        setErrors({})
        const data = {
            country,
            address,
            city,
            state,
            lat: parseFloat(latitude),
            lng: parseFloat(longitude),
            description,
            price,
            name,
        }

        console.log(errors)

        await dispatch(updateSpot(spotId, data))
        .catch(async (res) => {
            console.log(res)
            const data = await res.json()
            if(data && data.errors) {
                setErrors(data.errors)
            }
        })
        .then((data) => {
            navigate(`/spots/${data.id}`)
        })
    }

    return(
        <div className="createSpot">
        <div className="form">
        <div className="headingInfo">
            <h1 className="header">Update Your new Spot</h1>
        </div>
        <form onSubmit={handleSubmit} className="spotForm">
            <div className="formDiv">
            <div className="locationDiv">
                        <h3 className="locationHead">Where is your place located?</h3>
                        <p className="locationP">Guests will only get your exact address once they booked a reservation.</p>
                        <div className="countryDiv">
                            <label>
                                Country
                            </label>
                            {errors?.country && (
                                <p style={{color: 'red'}}>{errors?.country}</p>
                            )}
                            <input
                                className="country"
                                placeholder="Country"
                                type="text"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </div>
                        <div className="addressDiv">
                            <label>
                                Street Address
                            </label>
                            {errors?.address && (
                                <p style={{color: 'red'}}>{errors.address}</p>
                            )}
                            <input
                                className="address"
                                placeholder="Street Address"
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="cityDiv">
                            <label>
                                City
                            </label>
                            {errors?.city && (
                                <p style={{color: 'red'}}>{errors.city}</p>
                            )}
                            <input
                                className="city"
                                placeholder="City"
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                            <span className="stateCom"> ,</span>
                        <div className="stateDiv">
                            <label>
                                State
                            </label>
                            {errors?.state && (
                                <p style={{color: 'red'}}>{errors.state}</p>
                            )}
                            <input
                                className="state"
                                placeholder="State"
                                type="text"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                        </div>
                        <div className="latDiv">
                            <label>
                                Latitude
                            </label>
                            {errors?.lat && (
                                <p style={{color: 'red'}}>{errors.lat}</p>
                            )}
                            <input
                                className="latitude"
                                placeholder="Latitude"
                                type="text"
                                value={latitude}
                                onChange={(e) => setLatitude(e.target.value)}
                            />
                        </div>
                            <span className="lngCom"> ,</span>
                        <div className="lngDiv">
                            <label>
                                Longitude
                            </label>
                            {errors?.lng && (
                                <p style={{color: 'red'}}>{errors.lng}</p>
                            )}
                            <input
                                className="longitude"
                                placeholder="Longitude"
                                type="text"
                                value={longitude}
                                onChange={(e) => setLongitude(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="descriptionDiv">
                        <h3 className="descriptionHead">Describe your place to guests</h3>
                        <p className="descriptionText">Mention the best feature of you space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                        {errors?.description && (
                            <p style={{color: 'red'}}>{errors.description}</p>
                        )}
                        <textarea
                            className="newdescription"
                            placeholder="Please write at least 30 characters"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="nameDiv">
                        <h3 className="nameHead">Create a title for your spot</h3>
                        <p className="nameText">Catch guest&apos;s attention with a spot title that highlights what makes your place special.</p>
                        {errors?.name && (
                            <p style={{color: 'red'}}>{errors.name}</p>
                        )}
                        <input
                            className="name"
                            placeholder="Name of your spot"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="priceDiv">
                        <h3 className="priceHead">Set a base price for your spot</h3>
                        <p className="priceDivText">Competitve pricing can help your listing stand out and rank higher in search results.</p>
                        {errors?.price && (
                            <p style={{color: 'red'}}>{errors.price}</p>
                        )}
                        $ <input
                            className="newprice"
                            placeholder="Price per night (USD)"
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                <button type="submit" className="createSpotButton">Update Spot</button>
            </div>
        </form>
        </div>
    </div>
    )
}

export default UpdateSpotPage;

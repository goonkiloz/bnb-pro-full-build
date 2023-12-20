import { useDispatch, useSelector } from "react-redux"
import { useState } from "react";
import { updateSpot } from "../../store/spots";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";



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

        console.log(data)

        await dispatch(updateSpot(spotId, data))
        .catch(async (res) => {
            console.log(res)
            const data = await res.json()
            if(data && data.errors) {
                setErrors(data)
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
                    <input
                        className="country"
                        placeholder='country'
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                    {errors?.country && (
                        <p>{errors.country}</p>
                    )}
                    <input
                        className="address"
                        placeholder="Street Address"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    {errors?.address && (
                        <p>{errors.address}</p>
                    )}
                    <input
                        className="city"
                        placeholder="City"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    {errors?.city && (
                        <p>{errors.city}</p>
                    )}
                    <span className="stateCom"> ,</span>
                    <input
                        className="state"
                        placeholder="State"
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                    {errors?.state && (
                        <p>{errors.state}</p>
                    )}
                    <input
                        className="latitude"
                        placeholder="Latitude"
                        type="text"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                    />
                    {errors?.latitude && (
                        <p>{errors.latitude}</p>
                    )}
                    <span className="lngCom"> ,</span>
                    <input
                        className="longitude"
                        placeholder="Longitude"
                        type="text"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                    />
                    {errors?.longitude && (
                        <p>{errors.longitude}</p>
                    )}
                </div>
                <div className="descriptionDiv">
                    <h3 className="descriptionHead">Describe your place to guests</h3>
                    <p className="descriptionText">Mention the best feature of you space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                    <textarea
                        className="newdescription"
                        placeholder="Please write at least 30 characters"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {errors?.description && (
                        <p>{errors.description}</p>
                    )}
                </div>
                <div className="nameDiv">
                    <h3 className="nameHead">Create a title for your spot</h3>
                    <p className="nameText">Catch guest&apos;s attention with a spot title that highlights what makes your place special.</p>
                    <input
                        className="name"
                        placeholder="Name of your spot"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors?.name && (
                        <p>{errors.name}</p>
                    )}
                </div>
                <div className="priceDiv">
                    <h3 className="priceHead">Set a base price for your spot</h3>
                    <p className="priceDivText">Competitve pricing can help your listing stand out and rank higher in search results.</p>
                    $ <input
                        className="newprice"
                        placeholder="Price per night (USD)"
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    {errors?.price && (
                        <p>{errors.price}</p>
                    )}
                </div>
                <button type="submit" className="createSpotButton">Update Spot</button>
            </div>
        </form>
        </div>
    </div>
    )
}

export default UpdateSpotPage;

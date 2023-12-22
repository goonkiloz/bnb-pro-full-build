import { useState } from "react";
import { useDispatch } from "react-redux";
import { createSpot, createSpotImage } from "../../store/spots";
import UploadImageModal from "./UploadImageModal";
import OpenModalButton from "../OpenModalButton";
import './CreateSpot.css'
import { useNavigate } from "react-router-dom";


function CreateSpotPage() {

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [files, setFiles] = useState([]);
    const [errors, setErrors] = useState();


    const register = (files) => {
        setFiles(files)
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        setErrors({});

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

        await dispatch(createSpot(data))
        .catch(async (res) => {
            const data = await res.json()
            if(data && data.errors) {
                setErrors(data.errors)
            }
        })
        .then((data) => {
            files.forEach((file, index) => {
                if(index === 0) {
                    const formData = new FormData()
                    formData.append('url', file)
                    formData.append('preview', true)
                    dispatch(createSpotImage(data.id, formData))
                } else {
                    const formData = new FormData()
                    formData.append('url', file)
                    formData.append('preview', false)

                    dispatch(createSpotImage(data.id, formData))

                }
            })
            navigate(`/spots/${data.id}`)
        })
    }

    return (
        <div className="createSpot">
            <div className="form">
            <div className="headingInfo">
                <h1 className="header">Create a new Spot</h1>
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
                            {errors?.latitude && (
                                <p style={{color: 'red'}}>{errors.latitude}</p>
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
                            {errors?.longitude && (
                                <p style={{color: 'red'}}>{errors.longitude}</p>
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
                    <div className="uploadDiv">
                        <h3 className="uploadHead">Liven up your spot with photos</h3>
                        <p className="uploadText">Click the button below to add personalized photos to your spot to attract guests.</p>
                        <OpenModalButton
                            className="uploadButton"
                            buttonText={'Upload Here!'}
                            modalComponent={<UploadImageModal onRegister={register}/>}
                            itemText='Upload Here'
                        />
                    </div>
                    <button type="submit" className="createSpotButton">Create Spot</button>
                </div>
            </form>
            </div>
        </div>
    )




}

export default CreateSpotPage;

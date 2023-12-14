import { useState } from "react";
import { useDispatch } from "react-redux";
import { createSpot, createSpotImage } from "../../store/spots";
import UploadImageModal from "./UploadImageModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";


function CreateSpotPage() {
    const dispatch = useDispatch()


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

    function handleMultipleChange(event) {
        setFiles([...event.target.files]);
      }

    const register = (files) => {
        setFiles(files)
    }

    const handleSubmit = async(e) => {
        console.log(files)
        console.log(parseFloat(latitude))
        e.preventDefault();
        setErrors({})
        // const data = {

        //     country,
        //     address,
        //     city,
        //     state,
        //     lat: parseFloat(latitude),
        //     lng: parseFloat(longitude),
        //     description,
        //     price,
        //     name,
        // }

        const data = {

            country: 'united states',
            address: '123 lane way',
            city: 'sadfasdfa',
            state: 'asdfasdf',
            lat: 10.4,
            lng: 10.4,
            description: 'asdfasdfasdf',
            price: 123,
            name: 'asdfasdfasdfas',
        }

        await dispatch(createSpot(data))
        .catch(async (res) => {
            const data = await res.json()
            if(data && data.errors) {
                setErrors(data)
            }
        })
        .then((data) => files.forEach((file, index) => {
            if(index === 0) {
                const formData = new FormData()
                formData.append('url', file)
                formData.append('preview', true)
                // console.log(formData.getAll('url'))
                dispatch(createSpotImage(data.id, formData))
            } else {
                const formData = new FormData()
                formData.append('url', file)
                formData.append('preview', false)

                dispatch(createSpotImage(data.id, formData))
            }

        }))
    }

    return (
        <>
        <form onSubmit={handleSubmit} className="spotForm">
            <h1>Create a new Spot</h1>
            <h2>Where is your place located?</h2>
            <p>Guests will only get your exact address once they booked a reservation.</p>
            <input
                placeholder="Country"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
            />
            {errors?.country && (
                <p>{errors.country}</p>
            )}
            <input
                placeholder="Street Address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            {errors?.address && (
                <p>{errors.address}</p>
            )}
            <input
                placeholder="City"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            {errors?.city && (
                <p>{errors.city}</p>
            )}
            <input
                placeholder="State"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
            />
            {errors?.state && (
                <p>{errors.state}</p>
            )}
            <input
                placeholder="Latitude"
                type="text"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
            />
            {errors?.latitude && (
                <p>{errors.latitude}</p>
            )}
            <input
                placeholder="Longitude"
                type="text"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
            />
            {errors?.longitude && (
                <p>{errors.longitude}</p>
            )}
            <input
                placeholder="Please write at least 30 characters"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            {errors?.description && (
                <p>{errors.description}</p>
            )}
            <input
                placeholder="Name of your spot"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            {errors?.name && (
                <p>{errors.name}</p>
            )}
            <input
                placeholder="Price per night (USD)"
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            {errors?.price && (
                <p>{errors.price}</p>
            )}
            <OpenModalMenuItem
                modalComponent={<UploadImageModal onRegister={register}/>}
                itemText='Upload Here'
            />
            <button type="submit">Create Spot</button>
        </form>
        </>
    )




}

export default CreateSpotPage;

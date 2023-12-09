import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getSpot } from "../../store/spotDetail"
import { useParams } from "react-router-dom";

function SpotDetailPage() {
    const dispatch = useDispatch()

    const { spotId } = useParams()

    const spotState = useSelector((state) => state.spot[spotId])

    const spot = spotState

    useEffect(() => {
        dispatch(getSpot(spotId))
    }, [dispatch, spotId])




    return (
        <>
        <h2>{spot?.name}</h2>
        <p>
            {spot?.city}, {spot?.state}, {spot?.country}
        </p>
        <div>
        {spot?.SpotImages?.map(({url}) => {
            <img src={url} />
        })}
        </div>


        </>
    )
}

export default SpotDetailPage

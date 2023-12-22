// react dependencies

import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom";

// thunk actions

import { getSpot } from "../../store/spots"
import { getSpotReviews } from "../../store/reviews";

// page components

import LoggedOutPage from "./LoggedOutPage";
import LoggedInPage from "./LoggedInPage";
import OwnerDetailPage from "./OwnerDetailPage";

import './SpotDetail.css'

function SpotDetailPage() {
    const dispatch = useDispatch()

    const { spotId } = useParams()

    const userState = useSelector((state) => state.session)
    const spotState = useSelector((state) => state.spots[spotId])

    const spot = spotState


    useEffect(() => {
        dispatch(getSpot(spotId))
    }, [dispatch, spotId])

    useEffect(() => {
        dispatch(getSpotReviews(spotId))
    }, [dispatch, spotId])

    if(userState?.user === null) {
        return(
            <LoggedOutPage />
        )
    }else if(spot?.ownerId === userState?.user?.id) {
        return (
            <OwnerDetailPage />
        )
    }else if (userState?.user) {
        return(
            <LoggedInPage />
        )
    }
}

export default SpotDetailPage

const express = require('express');
const router = express.Router();

const { Booking, Spot, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

router.get('/current', requireAuth , async (req, res) => {
    const { user } = req;

    const Bookings = [];

    const bookings = await Booking.findAll({
        where: {userId: user.id}
    })

    for(let i = 0; i < bookings.length; i++) {

        const booking = await Booking.findOne({
            where: {id: bookings[i].id}
        })

        const spot = await Spot.findOne({
            where: {id: booking.spotId},
            // include: [
            //     {
            //         model: SpotImage,
            //         where: {
            //             preview: true
            //         },
            //         attributes: ['url']

            //     }
            // ],
            // attributes: [
            //         'id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt'
            // ]
        })

        const img = await SpotImage.findOne({
            where: {spotId: spot.id,
                    preview: true},

            attributes: ['url']
        })

        if(img) {

            let spotData = {
                id: spot.id,
                ownerId: spot.ownerId,
                address: spot.address,
                city: spot.city,
                state: spot.state,
                country: spot.country,
                lat: spot.lat,
                lng: spot.lng,
                name: spot.name,
                price: spot.price,
                previewImage: img.url
            }

            let data = {
                id: booking.id,
                spotId: booking.spotId,
                Spot: spotData,
                userId: booking.userId,
                startDate: booking.startDate,
                endDate: booking.endDate,
                createdAt: booking.createdAt,
                updatedAt: booking.updatedAt
            }

            Bookings.push(data)
        } else if (!img) {
            let spotData = {
                id: spot.id,
                ownerId: spot.ownerId,
                address: spot.address,
                city: spot.city,
                state: spot.state,
                country: spot.country,
                lat: spot.lat,
                lng: spot.lng,
                name: spot.name,
                price: spot.price,
                previewImage: null
            }

            let data = {
                id: booking.id,
                spotId: booking.spotId,
                Spot: spotData,
                userId: booking.userId,
                startDate: booking.startDate,
                endDate: booking.endDate,
                createdAt: booking.createdAt,
                updatedAt: booking.updatedAt
            }

            Bookings.push(data)
        }

    }

    res.status(200)
    res.json({Bookings})
})

router.put('/:bookingId', requireAuth, async (req, res) => {
    const { user } = req;

    const { bookingId } = req.params;

    const findBooking = await Booking.findOne({
        where: {id: bookingId}
    })

    if(!findBooking) {
        const err = new Error()
        err.message = "Booking couldn't be found"
        res.status(404)
        return res.json(err)
    }

    if(findBooking.userId !== user.id) {
        const err = new Error()
        err.message = "Forbidden"
        res.status(403)
        return res.json(err)
    }

    if(Date.now > findBooking.endDate) {
        const err = new Error()
        err.message = "Past bookings can't be modified"
        res.status(403)
        return res.json(err)
    }

    const { startDate, endDate } = req.body;

    const spot = await Spot.findOne({
        where: {id: findBooking.spotId}
    })

    const spotId = parseInt(findBooking.spotId)

    const findInt = parseInt(findBooking.id)

    const newStart = new Date(startDate).toISOString()

    const newEnd = new Date(endDate).toISOString()

    const currDate = new Date().toISOString()

    const existingBookings = await Booking.findAll({
        where: {spotId: spotId}
    })

    // res.json({
    //     spotId: spotId,
    //     findInt: findInt,
    //     newStart: newStart,
    //     newEnd: newEnd,
    //     currDate: currDate,
    //     existingBookings: existingBookings
    // })

    for(let i = 0; i < existingBookings.length; i++) {
        const booking = existingBookings[i]
        const bookingStart = booking.startDate.toISOString()
        const bookingEnd = booking.endDate.toISOString()
        if(newEnd <= newStart){
            const err = new Error()
            err.message = "Bad Request"
            err.errors = {
                endDate: "endDate cannot be on or before startDate"
            }
            res.status(400)
            return res.json(err)
        }else if(newEnd < currDate) {
            const err = new Error()
            err.message = "Past bookings can't be modified"
            console.log(currDate)
            res.status(403)

            return res.json(err)
        }

        if(booking.id !== findInt) {

            if(((((newStart === bookingStart) || (newStart === bookingEnd)) && (newEnd !== bookingEnd)) ||
               ((bookingStart < newStart && newStart < bookingEnd) && (bookingEnd <= newEnd))) && booking.id !== findInt){
                const err = new Error()
                err.message = "Sorry, this spot is already booked for the specified dates"
                err.errors = {
                    startDate: "Start date conflicts with an existing booking"
                }
                console.log(bookingStart)
                console.log(bookingEnd)
                res.status(403)
                return res.json(err)

            }else if(((((newEnd === bookingStart) || (newEnd === bookingEnd)) && (newStart !== bookingStart)) ||
                     ((bookingStart < newEnd && newEnd < bookingEnd) && (bookingStart >= newStart))) && booking.id !== findInt) {
                const err = new Error()
                err.message = "Sorry, this spot is already booked for the specified dates"
                err.errors = {
                    endDate: "End date conflicts with an existing booking"
                }
                res.status(403)
                return res.json(err)

            }else if(((newStart === bookingStart && newEnd === bookingEnd) ||
                     (bookingStart < newStart && newEnd < bookingEnd) ||
                     (newStart < bookingStart && bookingEnd < newEnd)) && booking.id !== findInt) {
                const err = new Error()
                err.message = "Sorry, this spot is already booked for the specified dates"
                err.errors = {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
                res.status(403)
                return res.json(err)
            }
        }
        // res.json({
        //     bookingid: booking.id,
        //     findInt: findInt
        // })
    }

    const updatedBook = await findBooking.update({
        startDate: newStart,
        endDate: newEnd
    })

    res.status(200)
    res.json(
        updatedBook
    )
})

router.delete('/:bookingId', requireAuth, async (req, res) => {
    const { user } = req;

    const { bookingId } = req.params;

    const findBooking = await Booking.findOne({
        where: {id: bookingId}
    })

    if(!findBooking) {
        const err = new Error()
        err.message = "Booking couldn't be found"
        res.status(404)
        return res.json(err)
    }

    if(findBooking.userId !== user.id) {
        const err = new Error()
        err.message = "Forbidden"
        res.status(403)
        return res.json(err)
    }

    if(Date.now > findBooking.startDate) {
        const err = new Error()
        err.message = "Bookings that have been started can't be deleted"
        res.status(403)
        return res.json(err)
    }

    await findBooking.destroy()

    res.status(200)
    res.json({
        message: "Successfully deleted"
    })
})

module.exports = router;

const express = require('express');
const router = express.Router();

const { requireAuth } = require('../../utils/auth')

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const AWS = require('aws-sdk');

const multer = require('multer');
const multerS3 = require('multer-s3');

const { uploadImg } = require('../../utils/upload.js');

const { User, Spot, Review, ReviewImage, SpotImage } = require('../../db/models');

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage("Review text is required"),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt({ min: 1, max: 5 })
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
]

router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;

    const Reviews = []

    const reviews = await Review.findAll({
        where: {userId: user.id}
    })

    for(let i = 0; i < reviews.length; i++) {

        const review = await Review.findOne({
            where: {id: reviews[i].id},
            include: [
                { model: User,
                 attributes: ['id', 'firstName', 'lastName']},

            ]
        })

        console.log(review.spotId)

        const reviewImgs = await ReviewImage.findAll({
            where: {reviewId: review.id},
            attributes: ['id', 'url']
        })

        const spot = await Spot.findOne({
            where: {id: review.spotId}
        })

        // const spot = await Spot.findOne({
        //     where: {id: review.spotId},
        //     include: [
        //         {
        //             model: SpotImage,
        //             where: {
        //                 preview: true
        //             },
        //             attributes: ['url']

        //         }
        //     ],
        //     attributes: [
        //             'id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt'
        //     ]
        // })
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
                id: review.id,
                userId: review.userId,
                spotId: review.spotId,
                review: review.review,
                stars: review.stars,
                createdAt: review.createdAt,
                updatedAt: review.updatedAt,
                User: review.User,
                Spot: spotData,
                ReviewImages: reviewImgs
            }

            Reviews.push(data)

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
                id: review.id,
                userId: review.userId,
                spotId: review.spotId,
                review: review.review,
                stars: review.stars,
                createdAt: review.createdAt,
                updatedAt: review.updatedAt,
                User: review.User,
                Spot: spotData,
                ReviewImages: reviewImgs
            }

            Reviews.push(data)
        }

    }


    res.status(200);
    res.json({Reviews});
})

router.post('/:reviewId/images', requireAuth, uploadImg.single('url'), async (req, res) => {
    const { user } = req;

    const { reviewId } = req.params;

    const { url } = req.body;

    const review = await Review.findOne({
        where: {id: reviewId}
    });

    if(!review) {
        const err = new Error()
        err.message = "Review couldn't be found"
        res.status(404)
        return res.json(err)
    };

    if(review.userId !== user.id) {
        const err = new Error()
        err.message = "Forbidden"
        res.status(403)
        return res.json(err)
    };

    const imgs = await ReviewImage.findAll({
        where: {reviewId: review.id}
    })

    if(imgs.length === 10) {
        const err = new Error()
        err.message = "Maximum number of images for this resource was reached"
        res.status(403)
        return res.json(err)
    }


    let filename;

    if(req.headers['content-type'] === 'application/json') {
         filename = url
    }else {
        filename = new Date().toISOString() + '-' + (req.file.originalname);
    }

    const bucketURL = ['https://bnbprostorage.s3.us-east-2.amazonaws.com/',`${filename}`]

    const urlData = bucketURL.join('')

    const newImg = await ReviewImage.create({
        reviewId: reviewId,
        url: urlData
    })

    const displayImg = {
        id: newImg.id,
        url: newImg.url
    }

    res.status(200)
    res.json(displayImg)
})

router.put('/:reviewId', requireAuth, validateReview, async (req, res) => {
    const { user } = req;

    const { reviewId } = req.params;

    const { review, stars } = req.body;

    const currReview = await Review.findOne({
        where: {id: reviewId}
    });

    if(!currReview) {
        const err = new Error()
        err.message = "Review couldn't be found"
        res.status(404)
        return res.json(err)
    };

    if(currReview.userId !== user.id) {
        const err = new Error()
        err.message = "Forbidden"
        res.status(403)
        return res.json(err)
    };

    const updatedReview = await currReview.update({
        review: review,
        stars: stars
    })

    res.status(200)
    res.json(updatedReview)
})

router.delete('/:reviewId', requireAuth, async (req, res) => {
    const { user } = req;

    const { reviewId } = req.params;

    const doomedReview = await Review.findOne({
        where: {id: reviewId}
    });

    if(!doomedReview) {
        const err = new Error()
        err.message = "Review couldn't be found"
        res.status(404)
        return res.json(err)
    };

    if(doomedReview.userId !== user.id) {
        const err = new Error()
        err.message = "Forbidden"
        res.status(403)
        return res.json(err)
    };

    await doomedReview.destroy()

    res.status(200)
    res.json({
        message: "Successfully deleted"
    })

})

module.exports = router;

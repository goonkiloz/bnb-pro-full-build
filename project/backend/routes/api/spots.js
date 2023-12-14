const express = require('express');
const router = express.Router();



const { Op, Sequelize } = require('sequelize')

const { check, body } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { requireAuth } = require('../../utils/auth');

const { uploadImg } = require('../../utils/upload.js');

const { User, Spot, SpotImage, Review, ReviewImage, Booking, sequelize } = require('../../db/models');


const validateSpot = [
    check('address')
      .exists({ checkFalsy: true })
      .withMessage('Street address is required'),
    check('city')
      .exists({ checkFalsy: true })
      .withMessage("City is required"),
    check('state')
      .exists({ checkFalsy: true })
      .withMessage("State is required"),
    check('country')
      .exists({ checkFalsy: true })
      .withMessage("Country is required"),
    check('lat')
      .exists({ checkFalsy: true })
      .isFloat({ min: -90, max: 90 })
      .withMessage("Latitude is not valid"),
    check('lng')
      .exists({ checkFalsy: true })
      .isFloat({ min: -180, max: 180 })
      .withMessage("Longitude is not valid"),
    check('name')
      .exists({ checkFalsy: true})
      .isLength({ max: 50 })
      .withMessage("Name must be less than 50 characters"),
    check('description')
      .exists({ checkFalsy: true })
      .withMessage("Description is required"),
    check('price')
        .exists({ checkFalsy: true })
        .isFloat({ min: 0})
        .withMessage("Price per day is required"),
    handleValidationErrors
  ];

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

    const validateQuery = [
        check('page')
            .optional({nullable: true})
            .isInt({min: 1})
            .withMessage("Page must be greater than or equal to 1"),
        check('size')
            .optional({nullable: true})
            .isInt({min: 1})
            .withMessage("Size must be greater than or equal to 1"),
        check('maxLat')
            .optional({nullable: true})
            .isDecimal({ force_decimal: true, decimal_digits: 1, min: -90, max: 90 })
            .withMessage("Minimum latitude is invalid"),
        check('minLat')
            .optional({nullable: true})
            .isDecimal({ force_decimal: true, decimal_digits: 1, min: -90, max: 90 })
            .withMessage("Minimum latitude is invalid"),
        check('minLng')
            .optional({nullable: true})
            .isDecimal({ force_decimal: true, decimal_digits: 1, min: -180, max: 180 })
            .withMessage("Minimum longitude is invalid"),
        check('maxLng')
            .optional({nullable: true})
            .isDecimal({ force_decimal: true, decimal_digits: 1, min: -180, max: 180 })
            .withMessage("Maximum longitude is invalid"),
        check('minPrice')
            .optional({nullable: true})
            .isFloat({ min: 0 })
            .withMessage("Minimum price must be greater than or equal to 0"),
        check('maxPrice')
            .optional({nullable: true})
            .isFloat({ min: 0 })
            .withMessage("Maximum price must be greater than or equal to 0"),
        handleValidationErrors
    ]

router.get('/', validateQuery, async (req, res) => {

    let query = {
        where: {}
    }

    const page = req.query.page === undefined ? 1 : parseInt(req.query.page);
    const size = req.query.size === undefined ? 20 : parseInt(req.query.size);
    if (page >= 1 && size >= 1) {
        if(page < 10) {
            query.offset = size * (page - 1);
        }
        if(size < 20) {
            query.limit = size;
        }
    } else if(page || size < 0) {
        if(page < 0) {
            const err = new Error()
            err.message = 'Bad Request'
            err.errors = {
                page: "Page must be greater than or equal to 1"
            }
            res.status(400)
            return res.json(err)
        } else if(size < 0) {
            const err = new Error()
            err.message = 'Bad Request'
            err.errors = {
                size: "Size must be greater than or equal to 1"
            }
            res.status(400)
            return res.json(err)
        }
    }

    const { minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    if(minLat || maxLat) {
        if(maxLat) {
            query.where.lat =  { [Op.lt]: maxLat }
        }

        if(minLat) {
            query.where.lat = { [Op.gt]: minLat }
        }
    }

    if(minLng || maxLng) {
        if(maxLng){
            query.where.lng = { [Op.lt]: maxLng }
        }

        if(minLng){
            query.where.lng = { [Op.gt]: minLng}
        }
    }

    if(minPrice || maxPrice) {
        if(minPrice){
            query.where.price = { [Op.gt]: minPrice }
        }

        if(maxPrice){
            query.where.price = { [Op.lt]: maxPrice }
        }
    }


    if(!req.query.page && !req.query.size){

        const Spots = []
        const spotsData = await Spot.findAll({})

        for(let i = 0; i < spotsData.length; i++) {
            const spotid = spotsData[i].id

            const review = await Review.findOne({
                where: {spotId: spotid}
            })

            const img = await SpotImage.findOne({
                where: {spotId: spotid,
                        preview: true},
                raw:true
            })

            if(img && review) {

                const spot = await Spot.findOne({
                    where: {id: spotsData[i].id},
                    include: [
                        {
                            model: SpotImage,
                            where: {
                                preview: true
                            },
                            attributes: ['url']

                        }
                    ],
                    attributes: [
                            'id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt',
                    ],
                    raw: true
                })

                const avgRatingValue = async () => {
                    const reviews = await Review.findAll({
                        where: {spotId: spot.id},
                        attributes: ['stars'],
                        raw: true
                    })

                    let counter = 0;

                    reviews.map((reviewStars) => {
                        counter += reviewStars.stars
                    })

                    const avgNum = counter / reviews.length

                    return Math.round(avgNum * 10) / 10
                }

                const avgRating = await avgRatingValue()

                const img = await SpotImage.findOne({
                    where: {spotId: spot.id,
                            preview: true},
                    raw:true
                })

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
                    description: spot.description,
                    price: spot.price,
                    createdAt: spot.createdAt,
                    updatedAt: spot.updatedAt,
                    avgRating: avgRating,
                    previewImage: img.url,
                }
                console.log(1)

            Spots.push(spotData)

            } else if(review && !img) {

                const spot = await Spot.findOne({
                    where: {id: spotsData[i].id},
                    attributes: [
                            'id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt'
                    ],
                    raw: true
                })

                const avgRatingValue = async () => {
                    const reviews = await Review.findAll({
                        where: {spotId: spot.id},
                        attributes: ['stars'],
                        raw: true
                    })

                    let counter = 0;

                    reviews.map((reviewStars) => {
                        counter += reviewStars.stars
                    })

                    const avgNum = counter / reviews.length

                    return Math.round(avgNum * 10) / 10
                }

                const avgRating = await avgRatingValue()

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
                    description: spot.description,
                    price: spot.price,
                    createdAt: spot.createdAt,
                    updatedAt: spot.updatedAt,
                    avgRating: avgRating,
                    previewImage: null
                }
                console.log(2)
            Spots.push(spotData)

            } else if(!review && img) {
                const spot = await Spot.findOne({
                    where: {id: spotsData[i].id},
                    include: [
                        {
                            model: SpotImage,
                            where: {
                                preview: true
                            },
                            attributes: ['url']

                        }
                    ]
                })

                const img = await SpotImage.findOne({
                    where: {spotId: spot.id,
                            preview: true},
                    raw:true
                })

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
                    description: spot.description,
                    price: spot.price,
                    createdAt: spot.createdAt,
                    updatedAt: spot.updatedAt,
                    avgRating: 0,
                    previewImage: img.url
                }
                console.log(3)
            Spots.push(spotData)

            } else if(!review && !img) {
                const spot = await Spot.findOne({
                    where: {id: spotsData[i].id},
                })

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
                    description: spot.description,
                    price: spot.price,
                    createdAt: spot.createdAt,
                    updatedAt: spot.updatedAt,
                    avgRating: 0,
                    previewImage: null
                }
                console.log(4)
            Spots.push(spotData)

            }
        }


        res.status(200)
        return res.json({Spots})

    } else {
        const Spots = []
        const spotsData = await Spot.findAll(query)



        for(let i = 0; i < spotsData.length; i++) {

            const spot = await Spot.findOne({
                where: {id: spotsData[i].id},
                include: [
                    {
                        model: Review,
                        attributes: [],
                    },
                    {
                        model: SpotImage,
                        where: {
                            preview: true
                        },
                        attributes: ['url']

                    }
                ],
                attributes: [
                        'id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt'
                ],
                raw: true
            })

            const avgRatingValue = async () => {
                const reviews = await Review.findAll({
                    where: {spotId: spot.id},
                    attributes: ['stars'],
                    raw: true
                })

                let counter = 0;

                reviews.map((reviewStars) => {
                    counter += reviewStars.stars
                })

                const avgNum = counter / reviews.length

                return Math.round(avgNum * 10) / 10
            }

            const avgRating = await avgRatingValue()

            const img = await SpotImage.findOne({
                where: {spotId: spot.id,
                        preview: true}
            })

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
                description: spot.description,
                price: spot.price,
                createdAt: spot.createdAt,
                updatedAt: spot.updatedAt,
                avgRating: avgRating,
                previewImage: img.url,
            }

            console.log(spot.avgRating)

            Spots.push(spotData)
        }

        res.status(200)
        res.json({Spots, page, size})
    }
})

router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;

    const Spots = []
        const spotsData = await Spot.findAll({})

        for(let i = 0; i < spotsData.length; i++) {
            const spotid = spotsData[i].id

            const review = await Review.findOne({
                where: {spotId: spotid}
            })



            const img = await SpotImage.findOne({
                where: {spotId: spotid,
                        preview: true},
                raw:true
            })
            if(img && review) {

                const spot = await Spot.findOne({
                    where: {id: spotsData[i].id},
                    include: [
                        {
                            model: SpotImage,
                            where: {
                                preview: true
                            },
                            attributes: ['url']

                        }
                    ],
                    attributes: [
                            'id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt'
                    ],
                    raw: true
                })

                const avgRatingValue = async () => {
                    const reviews = await Review.findAll({
                        where: {spotId: spot.id},
                        attributes: ['stars'],
                        raw: true
                    })

                    let counter = 0;

                    reviews.map((reviewStars) => {
                        counter += reviewStars.stars
                    })

                    const avgNum = counter / reviews.length

                    return Math.round(avgNum * 10) / 10
                }

                const avgRating = await avgRatingValue()

                const img = await SpotImage.findOne({
                    where: {spotId: spot.id,
                            preview: true},
                    raw:true
                })

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
                    description: spot.description,
                    price: spot.price,
                    createdAt: spot.createdAt,
                    updatedAt: spot.updatedAt,
                    avgRating: avgRating,
                    previewImage: img.url,
                }
                console.log(1)

            Spots.push(spotData)

            } else if(review && !img) {

                const spot = await Spot.findOne({
                    where: {id: spotsData[i].id},
                    include: [
                        {
                            model: Review,
                            attributes: [],
                        }
                    ],
                    attributes: [
                            'id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt'
                    ]
                })

                const avgRatingValue = async () => {
                    const reviews = await Review.findAll({
                        where: {spotId: spot.id},
                        attributes: ['stars'],
                        raw: true
                    })

                    let counter = 0;

                    reviews.map((reviewStars) => {
                        counter += reviewStars.stars
                    })

                    const avgNum = counter / reviews.length

                    return Math.round(avgNum * 10) / 10
                }

                const avgRating = await avgRatingValue()

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
                    description: spot.description,
                    price: spot.price,
                    createdAt: spot.createdAt,
                    updatedAt: spot.updatedAt,
                    avgRating: avgRating,
                    previewImage: null
                }
                console.log(2)
            Spots.push(spotData)

            } else if(!review && img) {
                const spot = await Spot.findOne({
                    where: {id: spotsData[i].id},
                    include: [
                        {
                            model: SpotImage,
                            where: {
                                preview: true
                            },
                            attributes: ['url']

                        }
                    ]
                })

                const img = await SpotImage.findOne({
                    where: {spotId: spot.id,
                            preview: true},
                    raw:true
                })

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
                    description: spot.description,
                    price: spot.price,
                    createdAt: spot.createdAt,
                    updatedAt: spot.updatedAt,
                    avgRating: 0,
                    previewImage: img.url
                }
                console.log(3)
            Spots.push(spotData)

            } else if(!review && !img) {
                const spot = await Spot.findOne({
                    where: {id: spotsData[i].id},
                })

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
                    description: spot.description,
                    price: spot.price,
                    createdAt: spot.createdAt,
                    updatedAt: spot.updatedAt,
                    avgRating: 0,
                    previewImage: null
                }
                console.log(4)
            Spots.push(spotData)

            }
        }


        res.status(200)
        return res.json({Spots})
})

router.get('/:spotId', async (req, res) => {
    const { spotId } = req.params;

    const spotCheck = await Spot.findOne({
        where: {id: spotId}
    })

    if(!spotCheck) {
        const err = new Error()
        err.message = "Spot couldn't be found"
        res.status(404)
        return res.json(err)
    }

    const reviewCheck = await Review.findAll({
        where: {spotId: spotId}
    })

    if(reviewCheck.length > 0) {
        console.log(1)
        const spot = await Spot.findOne({
            where: {id: spotId},
            include: [
                {
                    model: Review,
                    where: {spotId: spotId},
                    attributes: [],
                }
            ]
        })

        const SpotImages = await SpotImage.findAll({
            where: {spotId: spotId},
            attributes: {
                exclude: ['spotId', 'createdAt', 'updatedAt']
            }
        })

        const reviewCount = await Review.count({
            where: {spotId: spotId}
        })

        const Owner = await User.findOne({
            where: {id: spot.ownerId},
            attributes: {
                exclude: ['username']
            }
        })

        const avgRatingValue = async () => {
            const reviews = await Review.findAll({
                where: {spotId: spot.id},
                attributes: ['stars'],
                raw: true
            })

            let counter = 0;

            reviews.map((reviewStars) => {
                counter += reviewStars.stars
            })

            const avgNum = counter / reviews.length

            return Math.round(avgNum * 10) / 10
        }

        const avgRating = await avgRatingValue()

        const data = {
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: spot.price,
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt,
            numReview: reviewCount,
            avgRating: avgRating,
            SpotImages,
            Owner
        }


        res.status(200)
        res.json(data)
    } else if(reviewCheck.length === 0) {
        console.log(2)
        const spot = await Spot.findOne({
            where: {id: spotId}
        })

        console.log(spot)

        const SpotImages = await SpotImage.findAll({
            where: {spotId: spotId},
            attributes: {
                exclude: ['spotId', 'createdAt', 'updatedAt']
            }
        })

        const reviewCount = await Review.count({
            where: {spotId: spotId}
        })

        const Owner = await User.findOne({
            where: {id: spot.ownerId},
            attributes: {
                exclude: ['username']
            }
        })


        const data = {
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: spot.price,
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt,
            numReview: reviewCount,
            avgRating: 0,
            SpotImages,
            Owner
        }

        res.status(200)
        res.json(data)
    }
})

router.post('/', requireAuth, validateSpot, async (req, res) => {
    const { user } = req;

    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const newSpot = await Spot.create({
        ownerId: user.id,
        address: address,
        city: city,
        state: state,
        country: country,
        lat: lat,
        lng: lng,
        name: name,
        description: description,
        price: price
    })

    res.status(201)
    res.json(newSpot)
})

router.post('/:spotId/images', requireAuth, uploadImg.single('url'), async (req, res) => {
    const { user } = req;

    const { spotId } = req.params;

    const { preview, url } = req.body;

    const spot = await Spot.findOne({
        where: {id: spotId}
    })

    if(!spot) {
        const err = new Error()
        err.message = "Spot couldn't be found"
        res.status(404)
        return res.json(err)
    }

    if(spot.ownerId !== user.id) {
        const err = new Error()
        err.message = "Forbidden"
        res.status(403)
        return res.json(err)
    }

    let filename;

    if(req.headers['content-type'] === 'application/json') {
         filename = url
    }else{
        filename = new Date().toDateString() + '-' + (req.file.originalname);
    }



    console.log(filename)

    const bucketURL = ['https://bnbprostorage.s3.us-east-2.amazonaws.com/',`${filename}`]

    const urlData = bucketURL.join('')

    const newImg = await SpotImage.create({
        spotId: spotId,
        url: urlData,
        preview: preview
    })

    const displayImg = {
        id: newImg.id,
        url: newImg.url,
        preview: newImg.preview
    }

    res.status(200)
    res.json(displayImg)
})

router.put('/:spotId', requireAuth, validateSpot, async (req, res) => {
    const { user } = req;

    const { spotId } = req.params;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const spot = await Spot.findOne({
        where: {id: spotId}
    })

    if(!spot) {
        const err = new Error()
        err.message = "Spot couldn't be found"
        res.status(404)
        return res.json(err)
    }

    if(spot.ownerId !== user.id) {
        const err = new Error()
        err.message = "Forbidden"
        res.status(403)
        return res.json(err)
    }

    const updatedSpot = await spot.update({
        address: address,
        city: city,
        state: state,
        country: country,
        lat: lat,
        lng: lng,
        name: name,
        description: description,
        price: price
    })

    res.status(200)
    res.json(updatedSpot)
})

router.delete('/:spotId', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const { user } = req;

    const doomedSpot = await Spot.findOne({
        where: {id: spotId}
    })

    if(!doomedSpot) {
        const err = new Error()
        err.message = "Spot couldn't be found"
        res.status(404)
        return res.json(err)
    }

    if (!user) {
        const err = new Error()
        err.message = "Authentication required"
        res.status(401)
        return res.json(err)
    }

    if(doomedSpot.ownerId !== user.id) {
        const err = new Error()
        err.message = "Forbidden"
        res.status(403)
        return res.json(err)
    }

    await doomedSpot.destroy()

    res.status(200)
    res.json({
        message: "Successfully deleted"
    })
})

router.get('/:spotId/reviews', async (req, res) => {
    const { spotId } = req.params;

    const spot = await Spot.findOne({
        where: {id: spotId},
        include: {
            model: Review,
            include: [
                { model: User,
                  attributes: ['id', 'firstName', 'lastName']
                },
                { model: ReviewImage,
                  attributes: {
                    exclude : ['reviewId', 'createdAt', 'updatedAt']
                  }
                }

            ]
        }
    })

    if(!spot) {
        const err = new Error()
        err.message = "Spot couldn't be found"
        res.status(404)
        return res.json(err)
    }

    res.status(200)
    res.json({
        Reviews: spot.Reviews
    })
})

router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
    const { user } = req;

    const { review, stars } = req.body;

    const { spotId } = req.params;

    const spot = await Spot.findOne({
        where: {id: spotId},
        include: {
            model: Review
        }
    })

    if(!spot) {
        const err = new Error()
        err.message = "Spot couldn't be found"
        res.status(404)
        return res.json(err)
    }

    const reviews = await Review.findAll({
        where: {spotId: spotId}
    })

    let idCheck = [];

    for(let i = 0; i < reviews.length; i++) {
        let r = reviews[i]
        let id = r.userId
        idCheck.push(id)
    }

    if(idCheck.includes(user.id)) {
        let err = new Error()
        err.message = "User already has a review for this spot"
        res.status(500)
        return res.json(err)

    }

    const newReview = await Review.create({
        spotId: spot.id,
        userId: user.id,
        review: review,
        stars: stars
    })

    res.status(201)
    res.json(newReview)
})

router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const { user } = req;

    const { spotId } = req.params;

    const spot = await Spot.findOne({
        where: {id: spotId}
    })

    if(!spot) {
        const err = new Error()
        err.message = "Spot couldn't be found"
        res.status(404)
        return res.json(err)
    }

    if(user.id === spot.ownerId) {

        let Bookings = [];

        const bookings = await Booking.findAll({
            where: {spotId: spotId},
            include: User
        })

        for(let i = 0; i < bookings.length; i++) {
            let currBook = bookings[i]

            const user = currBook.User

            let display = ({
                User: user
            }, currBook.toJSON())

            Bookings.push(display)
        }

        res.status(200)
        return res.json({Bookings})
    }

    const Bookings = await Booking.findAll({
        where: {userId: user.id},
        attributes: {
            exclude: ['id', 'userId', 'createdAt', 'updatedAt']
        }
    })

    res.status (200)
    res.json({Bookings})

})

router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const { user } = req;

    const { spotId } = req.params;

    const spot = await Spot.findOne({
        where: {id: spotId}
    })

    if(!spot) {
        const err = new Error()
        err.message = "Spot couldn't be found"
        res.status(404)
        return res.json(err)
    }

    const { startDate, endDate } = req.body;


    const newStart = new Date(startDate).toISOString()

    const newEnd = new Date(endDate).toISOString()

    const currDate = new Date().toISOString()

    const existingBookings = await Booking.findAll({
        where: {spotId: spotId}
    })

    for(let i = 0; i < existingBookings.length - 1; i++) {
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

        if((((newStart === bookingStart) || (newStart === bookingEnd)) && (newEnd !== bookingEnd)) ||
           ((bookingStart < newStart && newStart < bookingEnd) && (bookingEnd <= newEnd))){
            const err = new Error()
            err.message = "Sorry, this spot is already booked for the specified dates"
            err.errors = {
                startDate: "Start date conflicts with an existing booking"
            }
            console.log(bookingStart)
            console.log(bookingEnd)
            res.status(403)
            return res.json(err)

        }else if((((newEnd === bookingStart) || (newEnd === bookingEnd)) && (newStart !== bookingStart)) ||
                 ((bookingStart < newEnd && newEnd < bookingEnd) && (bookingStart >= newStart))) {
            const err = new Error()
            err.message = "Sorry, this spot is already booked for the specified dates"
            err.errors = {
                endDate: "End date conflicts with an existing booking"
            }
            res.status(403)
            return res.json(err)

        }else if((newStart === bookingStart && newEnd === bookingEnd) ||
                 (bookingStart < newStart && newEnd < bookingEnd) ||
                 (newStart < bookingStart && bookingEnd < newEnd)) {
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

    if(user.id !== spot.ownerId ) {

        const newBooking = await Booking.create({
            spotId: spot.id,
            userId: user.id,
            startDate: startDate,
            endDate: endDate
        })

        res.status(200)
        return res.json(newBooking)
    } else if(user.id === spot.ownerId) {
        const err = new Error()
        err.message = "Forbidden"
        res.status(403)
        return res.json(err)
    }
})

module.exports = router;

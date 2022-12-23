const express = require("express")
const {requireAuth} = require('../../utils/auth')
const {Spot, Image, User, Review, Sequelize} = require('../../db/models')

const router = express.Router();
const {check} = require('express-validator');
const {handleValidationErrors} = require('../../utils/validation');

const validateSpot = [
    check('address')
    .exists({checkFalsy: true})
    .notEmpty()
    .withMessage('Street address is required'),
    check('city')
    .exists({checkFalsy: true})
    .withMessage('City is required'),
    check('state')
    .exists({checkFalsy:true})
    .withMessage('State is required'),
    check('country')
    .exists({checkFalsy:true})
    .withMessage('Country is required'),
    check('lat')
    .not()
    .isString()
    .withMessage('Latitude is not valid'),
    check('lng')
    .not()
    .isString()
    .withMessage('Longitude is not valid'),
    check('name')
    .exists({checkFalsy:true})
    .isLength({max: 50})
    .withMessage('Name must be less than 50 characters'),
    check('description')
    .exists({checkFalsy:true})
    .withMessage('Description is required'),
    check('price')
    .exists({checkFalsy:true})
    .withMessage('Price is required'),
    handleValidationErrors
]

router.delete('/:id', requireAuth, async (req, res, next) => {
    const deleteSpot = await Spot.findByPk(req.params.id)

    if(deleteSpot) {
        await deleteSpot.destroy()
        res.status = 200;
        res.json({
            message: "Successfully deleted",
            statusCode: 200
        })

    }
})

router.put('/:id', validateSpot, requireAuth, async(req, res, next) => {
    const {address, city, state, country,lat, lng, name, description, price} = req.body

    const spot = await Spot.findByPk(req.params.id)

    if(spot) {
        spot.update({
            address, city, state, country,lat, lng, name, description, price
        })

        res.json(spot)
    } else {
        const err = new Error("Spot couldn't be found")
        err.status = 404
        next(err)
    }
})

router.post('/:id/reviews', requireAuth, async (req, res, next) => {
    const {review, stars} = req.body

    const existingReview = await Review.findOne({
        where: {
            userId: req.user.id,
            spotId: parseInt(req.params.id)
        }
    })

    const spotExist = await Spot.findByPk(req.params.id)

    if(!spotExist) {
        const err = new Error('Validation error')
        err.status = 403,
        err.errors = ["Spot couldn't be found"]
        next(err)
    }

    if(existingReview) {
        const err = new Error('Validation error')
        err.status = 403,
        err.errors = ["User already has a review for this spot"]
        next(err)
    }

    if(!review) {
        const err = new Error('Validation error')
        err.status = 400,
        err.errors = ['Review text is required']
        next(err)
    } else if (stars !== parseInt(stars) || stars < 1 || stars > 5) {
        const err = new Error('Validation error')
        err.status = 400,
        err.errors = ['Stars must be an integer from 1 to 5']
        next(err)
    } else {
        const theReview = await Review.create({
            userId: req.user.id,
            spotId: parseInt(req.params.id),
            review: review,
            stars: stars
        })

        res.json(theReview)
    }


})

router.post('/:id/images', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.id)

    if(spot.ownerId === req.user.id) {
        const {url, preview} = req.body

        const image = await Image.create({
            userId: req.user.id,
            spotId: req.params.id,
            url,
            preview
        })

        const imageScope = await Image.scope('defaultScope').findByPk(image.id)

        res.status = 200
        res.json(imageScope)

    } else {
        const err = new Error("Spot couldn't be found")
        err.status = 404
        err.errors = ['Spot does not belong to current User']
        next(err)
    }

})

router.post('/', validateSpot, requireAuth, async (req, res, next) => {
    const currentUser = req.user.id

    const {address, city, state, country, lat, lng, name, description, price} = req.body

    const userSpot = await Spot.create({
        ownerId: currentUser,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })
    if(userSpot) {
        res.status = 201
        res.json(userSpot)
    } else {
        res.status = 400
        next(err)
    }
})

router.get('/current', requireAuth, async (req, res) => {
    const spots = await Spot.findAll({
        where: {
            ownerId: req.user.id // req.user comes from requireAuth
        },
        include: [
            {
                model: Review
                //attributes: [[Sequelize.fn("AVG", Sequelize.col("stars")), "avgRating"]]
            },
            {
                model: Image,
                as: 'SpotImages'
            }
        ]
    })
    let spotsList = []
    spots.forEach(ele => {
        spotsList.push(ele.toJSON())
    })

    spotsList.forEach(spot => {
        let i = 0
        let sum = 0
        spot.Reviews.forEach(review => {
            i++
            sum = sum + review.stars
        })

        spot.avgRating = sum / i

        spot.SpotImages.forEach(image => {
            if(image.preview === true) {
                spot.previewImage = image.url
            }
        })
        if(!spot.previewImage) {
            spot.previewImage = 'N/A'
        }
        delete spot.Reviews
        delete spot.SpotImages
    })


    return res.json(spotsList)
})

router.get('/:id/reviews', async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.id)



    if(!spot) {
        const err = new Error("Couldn't find a Spot with the specified id")
        err.status = 404
        err.errors = ["Spot couldn't be found"]
        next(err)
    } else {
        const reviews = await Review.findAll({
            where: {
                spotId: req.params.id
            },
            include: [
                {
                    model: User
                },
                {
                    model: Image,
                    as: 'ReviewImages'
                }
            ]
        })

        res.json({reviews})
    }
})



router.get('/', async(req, res) => {
    const allSpots = await Spot.findAll({
        include: [
            {
                model: Review
            },
            {
                model: Image,
                as: 'SpotImages'
            }
        ]
    })

    let spotsList = []
    allSpots.forEach(ele => {
        spotsList.push(ele.toJSON())
    })

    spotsList.forEach(spot => {
        let i = 0
        let sum = 0
        spot.Reviews.forEach(review => {
            i++
            sum = sum + review.stars
        })

        spot.avgRating = sum / i

        spot.SpotImages.forEach(image => {
            if(image.preview === true) {
                spot.previewImage = image.url
            }
        })
        if(!spot.previewImage) {
            spot.previewImage = 'N/A'
        }
        delete spot.Reviews
        delete spot.SpotImages
    })

    res.status = 200

    return res.json(spotsList)
})

router.get('/:id', async(req, res, next) => {
    const {id} = req.params

    const spot = await Spot.findOne({
        where: {
            id: id
        },
        include: [
            {
                model: Image,
                as: 'SpotImages',
            },
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName'],
                as: 'Owner'
            }
        ]
    })

    if(!spot) {
        const err =  new Error("Spot couldn't be found")
        err.status = 404
        err.errors = ["Spot couldn't be found with the specified Id"]
        next(err)
    } else {


        res.status = 200
        res.json(spot)
    }
})




module.exports = router;

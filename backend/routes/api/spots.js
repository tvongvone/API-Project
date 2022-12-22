const express = require("express")
const {setCookie, requireAuth} = require('../../utils/auth')
const {Spot, Image, User} = require('../../db/models')

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
        deleteSpot.destroy()
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

router.post('/:id/images', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.id)

    if(spot.ownerId === req.user.id) {
        const {url, preview} = req.body

        const image = await Image.create({
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


    const currentUsersSpots = await Spot.findAll({
        where: {
            ownerId: req.user.id // req.user comes from requireAuth
        }
    })

    res.status = 200

    return res.json(currentUsersSpots)
})

router.get('/', async(req, res) => {
    const allSpots = await Spot.findAll()

    res.status = 200

    return res.json(allSpots)
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

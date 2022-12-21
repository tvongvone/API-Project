const express = require("express")
const {setCookie, requireAuth} = require('../../utils/auth')
const {Spot} = require('../../db/models')

const router = express.Router();
const {check} = require('express-validator');
const {handleValidationErrors} = require('../../utils/validation')

const validateSpot = [
    check('address')
    .exists({checkFalsy: true})
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
    .isLength({max: 50})
    .withMessage('Name must be less than 50 characters'),
    check('description')
    .exists({checkFalsy:true})
    .withMessage('Description is required'),
    check('price')
    .exists({checkFalsy:true})
    .withMessage('Price is required')
]

router.post('/', validateSpot, async(req, res, next) => {

})

router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id

    const currentUsersSpots = await Spot.findAll({
        where: {
            ownerId: userId
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


module.exports = router;

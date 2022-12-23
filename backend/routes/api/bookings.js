const express = require('express');

const {requireAuth} = require('../../utils/auth')
const {User, Booking, Spot} = require('../../db/models');


const router = express.Router();

const dateMiddleware = (req, res, next) => {
    const {startDate, endDate} = req.body
    if(new Date(startDate) < new Date()) {
        const err = new Error("Booking must be in the future")
        err.title = 'Validation Error'
        err.status = 403
        next(err)
    }

    if(new Date(endDate) <= new Date(startDate)) {
        const err = new Error("endDate cannot be on or before startDate")
        err.title = 'Validation Error'
        err.status = 400
        next(err)
    }

    next()
}

router.put('/:id', requireAuth, dateMiddleware, async (req, res, next) => {
    const ownBooking = await Booking.findOne({
        where: {
            id: req.params.id,
            userId: req.user.id
        }
    })

    if(!ownBooking) {
        const booking = await Booking.findOne({
            id: req.params.id
        })

        if(booking) {
            res.statusCode = 404
            res.json({message: 'This is not your booking', statusCode: 404})
        } else {
            res.statusCode = 404
            res.json({message: "Booking couldn't be found", statusCode: 404})
        }
    }

    console.log(ownBooking.toJSON())
})

router.get('/current', requireAuth,async (req, res, next) => {
const booking = await Booking.findAll({
    where: {
        userId: req.user.id
    },
    include: [
        {
            model: Spot
        }
    ]
})



res.json(booking)
})

module.exports = router;

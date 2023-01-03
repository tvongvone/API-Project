const express = require('express');

const {requireAuth} = require('../../utils/auth')
const {Booking, Spot, Sequelize, Image} = require('../../db/models');
const Op = Sequelize.Op

const router = express.Router();

const dateMiddleware = (req, res, next) => {
    const {startDate, endDate} = req.body
    if(new Date(startDate).getTime() < new Date().getTime()) {
        const err = new Error("Booking must be in the future")
        err.title = 'Validation Error'
        err.status = 403
        next(err)
    }

    if(new Date(endDate).getTime() <= new Date(startDate).getTime()) {
        const err = new Error("endDate cannot be on or before startDate")
        err.title = 'Validation Error'
        err.status = 400
        next(err)
    }

    next()
}

router.delete('/:id', requireAuth, async (req, res, next) => {
    const exist = await Booking.findByPk(req.params.id)

    if(!exist) {
        res.statusCode = 404
        return res.json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    }

    const owner = await Booking.findOne({
        where: {
            id: req.params.id,
            userId: req.user.id
        }
    })

    if(!owner) {
        res.statusCode = 404
        return res.json({
            message: "Booking does not belong to you",
            statusCode: 404
        })
    }

    if(new Date(owner.dataValues.startDate).getTime() <= new Date().getTime() && new Date(owner.dataValues.endDate).getTime() >= new Date().getTime()) {
        res.statusCode = 403
        return res.json({
            message: "Bookings that have been started can't be deleted"
        })
    } else {
        await owner.destroy()
        res.statusCode = 200

        res.json({
            message: "Successfully deleted",
            statusCode: 200
        })
    }
})

router.put('/:id', requireAuth, dateMiddleware, async (req, res, next) => {
    const ownBooking = await Booking.findOne({
        where: {
            id: req.params.id,
            userId: req.user.id
        }
    })


     if(!ownBooking) {
        const err = "Booking must belong to User"
        err.status = 404
        next(err)
    } else {
        if(ownBooking.dataValues.endDate < new Date()) {
            res.status = 403
            return res.json({
                message: "Past booking can't be modified",
                statusCode: 403
            })
        }

        const allBookings = await Booking.findAll({
            where: {
                spotId: ownBooking.dataValues.spotId
            }
        })

        for (let book of allBookings) {
            if (new Date(req.body.startDate) >= new Date(book.dataValues.startDate) &&
            new Date(req.body.startDate <= new Date(book.dataValues.endDate))) {
            const err = new Error("Sorry, this spot is already booked for the specified dates")
            err.status = 403
            err.errors = ['Start date conflicts with an existing booking',
            'End date conflicts with an existing booking']
            return next(err)
            }

            if(new Date(req.body.endDate) >= new Date(book.dataValues.startDate) &&
            new Date(req.body.endDate <= new Date(book.dataValues.endDate))) {
            const err = new Error("Sorry, this spot is already booked for the specified dates")
            err.status = 403
            err.errors = ['Start date conflicts with an existing booking',
            'End date conflicts with an existing booking']
            return next(err)
        }
        }

        ownBooking.update({
            startDate: req.body.startDate,
            endDate: req.body.endDate
        })

        res.json(ownBooking)
    }
})

router.get('/current', requireAuth, async (req, res, next) => {
    const booking = await Booking.findAll({
    where: {
        userId: req.user.id,
        spotId: {
            [Op.not]: null
        }
    },
    include: [
        {
            model: Spot,
            include: [
                {
                    model: Image,
                    as: 'SpotImages',
                    attributes: ['url', 'preview']
                }
            ],
            attributes: {exclude: ['createdAt', 'updatedAt']}
        }
    ],
    })

    res.json(booking)
})

module.exports = router;

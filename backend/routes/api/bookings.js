const express = require('express');

const {requireAuth} = require('../../utils/auth')
const {User, Booking, Spot} = require('../../db/models');


const router = express.Router();


router.get('/current', requireAuth,async (req, res, next) => {
const current = req.user.id

const booking = await Booking.findAll({
    include: [
        {
            model: Spot
        }
    ]
})



res.json(booking)
})

module.exports = router;

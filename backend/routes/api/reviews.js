const express = require('express');

const {requireAuth} = require('../../utils/auth')
const {Review, Image, Spot} = require('../../db/models');


const router = express.Router();

router.put('/:id', requireAuth, async (req, res, next) => {
    const {review, stars} = req.body

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
        const reviewExists = await Review.findOne({
            where: {
                id: req.params.id,
                userId: req.user.id
            }
        })

        if(reviewExists) {
            reviewExists.update({
                review, stars
            })

            res.json(reviewExists)
        } else {
            const err =  new Error("Couldn't find a Review with the specified id")
            err.status= 404
            err.errors = ["Review couldn't be found"]
            next(err)
        }
    }
})

router.post('/:id/images', requireAuth, async (req, res, next) => {
    const theReview = await Review.findOne({
        where: {
            id: req.params.id,
            userId: req.user.id
        }
    })

    if(!theReview) {
        const err = new Error("Review couldn't be found")
        err.status = 404
        next(err)
    }else {

    await Image.create({
        reviewId: req.params.id,
        url: req.body.url
    })

    const reviewImage = await Image.scope('reviewScope').findOne({
        where: {
            reviewId: req.params.id
        }
    })

    res.json(reviewImage)
}
})

router.get('/current', requireAuth, async (req, res, next) => {
    const review = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: Spot
            },
            {
                model: Image,
                as: 'ReviewImages',
                attributes: ['id', 'url']
            }
        ]
    })

    res.json(review)
})

router.delete('/:id', requireAuth, async(req, res, next) => {
    const deleteItem = await Review.findOne({
        where: {
            id: req.params.id,
            userId: req.user.id
        }
    })

    if(!deleteItem) {
        const err = new Error("Couldn't find a Review with the specified id")
        err.status = 404
        err.errors = ["Review couldn't be found"]
        next(err)
    } else {

        await deleteItem.destroy()

        res.json({
            message: "Successfully deleted",
            statusCode: 200
        })
    }
})



module.exports = router;

const express = require('express');
const router = express.Router();

const { requireAuth } = require('../../utils/auth')

const { ReviewImage, Review } = require('../../db/models')

router.delete('/:imageId', requireAuth, async (req, res) => {

    const { user } = req;

    const { imageId } = req.params;

    const findImg = await ReviewImage.findOne({
        where: {id: imageId}
    })

    if(!findImg) {
        const err = new Error()
        err.message = "Review Image couldn't be found"
        res.status(404)
        return res.json(err)
    }

    const review = await Review.findOne({
        where: {id: findImg.reviewId}
    })

    if(review.userId !== user.id) {
        const err = new Error()
        err.message = "Forbidden"
        res.status(403)
        return res.json(err)
    }

    await findImg.destroy()

    res.status(200)
    res.json({
        message: "Successfully deleted"
    })
})

module.exports = router;

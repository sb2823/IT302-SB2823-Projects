import express from 'express'
import vehiclesController from './vehicles.controller.js'
//import ReviewController from './reviews.controller.js'

const router = express.Router()
router.route('/').get(vehiclesController.apiGetVehicles)

//router.route("/id/:id").get(vehiclesController.apiGetMovieById)

router.route('/').get((req,res) => res.send('hello world'))


// router
//     .route("/review")
//     .post(ReviewController.apiPostReview)
//     .put(ReviewController.apiUpdateReview)
//     .delete(ReviewController.apiDeleteReview)

export default router



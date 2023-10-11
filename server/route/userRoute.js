import express from 'express'
import { bookVisit, cancelBooking, createUser, getAllBookings, toFav,getAllFav } from '../controller/userCntrl.js'
const router = express.Router()
import jwtCheck from '../config/auth0Config.js'




router.post("/register",jwtCheck,createUser)
router.post("/bookVisit/:id",jwtCheck,bookVisit)
router.post("/allBookings",getAllBookings)
router.post("/removeBooking/:id",jwtCheck,cancelBooking)
router.post("/toFav/:rid",jwtCheck,toFav)
router.post("/allFav/",jwtCheck,getAllFav)

export {router as userRoute}        
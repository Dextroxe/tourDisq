import express from 'express'
import { createResidency, getResidency,getAllResidencies } from '../controller/residencyCntrl.js'
const router = express.Router()
import jwtCheck from '../config/auth0Config.js'

router.post("/create",jwtCheck,createResidency)
router.get("/allresd",getAllResidencies)
router.get("/:id",getResidency)

export {router as residencyRoute}        
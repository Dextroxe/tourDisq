import asyncHandler from 'express-async-handler'
import { Prisma } from '../config/prismaConfig.js'


export const createUser = asyncHandler(async (req,res) => {
    // console.log("creating user");

    let {email} = req.body;
    const userExists = await Prisma.user.findUnique({where:{email:email}})
    if(!userExists){
        const user = await Prisma.user.create({data:req.body})
        res.send({
            message: "User registered successfully",
            user:user,
        });
    }
    else{
        res.status(201).send({message: "user already registered"})
    }

});


//booked visit check here
export const bookVisit = asyncHandler(async(req,res)=>{
    const {email,date} = req.body
    const {id} = req.params

    try {
        const alreadyBooked = await Prisma.user.findUnique({
            where: {email:email},
            select:{bookedVisits:true}
        })
        if(alreadyBooked.bookedVisits.some((visit) => visit.id === id)){
            res.status(400).json({message:"this residency is already booked by you"})
       }
       else{
        await Prisma.user.update({
            where: {email:email},
            data:{
                bookedVisits: {push:{id,date}}
            }
        })
        res.send("Your visit is booked successfully")
       }
    } catch (error) {
        throw new Error(error.message)
    }
})

//to get all booking from user

export const getAllBookings = asyncHandler(async(req,res)=>{
    const {email} = req.body

    try {
        const booking = await Prisma.user.findUnique({
            where: {email:email},
            select: {bookedVisits:true}
        })
        res.status(200).send(booking)
        
    } catch (error) {
        throw new Error(error.message)
        
    }
})

//function to cancel the booking

export const cancelBooking = asyncHandler(async(req,res)=>{
    const {email} = req.body
    const {id} = req.params
    try {
        const user = await Prisma.user.findUnique({
            where: {email:email},
            select: {bookedVisits:true}
        })
        
        const index = user.bookedVisits.findIndex((visit) => visit.id === id)

        if(index === -1){
            res.status(404).send({message:"Booking not found"})
        }else{
            user.bookedVisits.splice(index,1)
            await Prisma.user.update({
                where: {email:email}, 
                data:{
                    bookedVisits: user.bookedVisits
                }
            })
        }
        res.send("Booked cancelled successfully")
        
    } catch (error) {
        throw new Error(error.message)
        
    }
})

// add residency to fav. sections
export const toFav = asyncHandler(async(req,res) => {
    const {email} = req.body
    const {rid} = req.params

    try {
        const user =  await Prisma.user.findUnique({
            where: {email:email}
        })

        if(user.favResidenciesID.includes(rid)){
            const updateUser = await Prisma.user.update({
                where: {email:email},
                data:{
                    favResidenciesID: {
                            set: user.favResidenciesID.filter((id) => id !== rid)
                    }
                }
            })
            res.send({message:"removed from fav", user: updateUser})
        }else{
            const updateUser = await Prisma.user.update({
                where:{email:email},
                data:{
                    favResidenciesID:{
                        push:rid
                    }
                }
            })
            res.send({message:"updated fav ", user: updateUser})

        }
    } catch (error) {
        throw new Error(error.message)
    }

})

// get all fav. of the user

export const getAllFav = asyncHandler(async(req,res)=>{
    const {email} = req.body

    try {
        const favResd = await Prisma.user.findUnique({
            where:{email:email},
            select:{favResidenciesID:true}
        })
        res.status(200).send(favResd);
    } catch (error) {
        throw new Error(error.message)
        
    }
})
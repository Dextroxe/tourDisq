import asyncHandler from 'express-async-handler'
import { Prisma } from '../config/prismaConfig.js'


export const createResidency = asyncHandler(async (req,res) => {
    const {title, description, price, address, city, facilities, userEmail,country,image} = req.body.data

    console.log(req.body.data);

    try {

        const residency = await Prisma.residency.create({
           data:{
            title,
            description,
            price,
            address,
            country,
            city,
            facilities,
            image,
            owner:{connect : {email:userEmail}},
           }
        })
        res.send({
            message: "Residency with address created successfully",residency
        })

    } catch (error) {
        if(error.code === "P2002"){
            throw new Error('A Residency with address is already here')
        }
        throw new Error(error.message)
    }

});


// get all resiidencies in one go
export const getAllResidencies = asyncHandler(async(req,res)=>{
    
    try {
        const residencies = await Prisma.residency.findMany({
            orderBy:{
                createdAt: "desc"
            }
        })
        res.send(
            residencies
        )
    } catch (error) {
        throw new Error(error.message)
    }
})

//get specific resedency
export const getResidency = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    try {
        const residency = await Prisma.residency.findUnique({
            where:{id:id}
        })
        res.send(
            residency
        )

    } catch (error) {
        throw new Error(error.message)
    }
})
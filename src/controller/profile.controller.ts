import type { NextFunction } from "express";


export async function profile(req:Request,res:Response,next:NextFunction) {
    try{
const user_id = req.user.id;

const {
    address,
    city,
    state,
    zipCode,
    country,
    phoneNumber

}= req.body



    }catch(err){

    }
    
}
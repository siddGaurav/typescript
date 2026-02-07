import type { NextFunction, Request, Response } from "express";

import { User } from "../model/user.model.js";
// import { signupValidation } from "../middleware/authmiddlewere.js";
import { validationResult } from "express-validator";
import { comparePassword, genHash } from "../utils/utils.js";
import { signJwt } from "../utils/jwt.js";


export const signupAuth = async (req: Request, res: Response, next: NextFunction) => {
   try{

  const errors = validationResult(req);

    if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(err => err.msg);
            res.status(400).json({
                status: "failed",
                message: errorMessages
            });
            return;
        };
       const { name, email, password, phone } = req.body;

       const info = await User.create({
            name,
            email,
            phone,
            password: await genHash(password)
        });

               const resData = info.toJSON();
               console.log(resData);


               res.status(201).json({
                status:"success",
                message:"succes login data"
               });

   }catch(err){
    res.status(400).json({
                status:"failed API",
                message:"Failed SIgnUP",
                err:err
               });

   }
}



export async function loginProfile(req: Request, res: Response, next: NextFunction) {
    try {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({
        //         status: "failed",
        //         message: errors.array().map(err => err.msg)
        //     });
        // }

        const { email, password } = req.body;
        // console.log(email,password,"kamnhi kr rha h ")

        const getUser = await User.findOne({
            where: { email },
            attributes: ['id', 'name', 'email', 'phone', 'password'],raw:true
        
        });
        console.log(getUser,"kam kar rha he ")

        if (!getUser) {
            console.warn(`Login attempt with non-existent email: ${email}`);
            return res.status(401).json({
                status: "failed",
                message: "Invalid email"
            });
        }
        console.log(password, getUser.password);

        const isMatch = await comparePassword(password, getUser.password);
        // console.log(isMatch)


    
        if (isMatch) {
                 const token = signJwt({id:getUser.id,email:getUser.email})
            // console.log(isMatch,)
            // const { password,...safeUser} = getUser.toJSON();
            return res.status(200).json({
                status: "success",
                message: "Login successful",
               token:token
               
            });
        } else {
            return res.status(401).json({
                status: "failed",
                message: "Wrong password"
            });
        }

    } catch(err) {
        console.error(err);
        return res.status(500).json({
            status: "failed",
            message: "Login API failed",
            err:err
        });
    }
}




// export const getData = (req: Request, res: Response, next: NextFunction) => {
//     const { name, age } = req.query;
//     res.json({
//         data: name
//     })
// }



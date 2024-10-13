import { Router } from "express";
import { comparePass } from "../utils/handlePassword.js";
import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"

const app = Router()
const db = new PrismaClient()

app.post('/login', async (req, res) => {
    try {
        const userEmail = req.body.correo
        const password = req.body.pass
        const dataUser = await db.usuario.findUnique({
            where: {
                correo: userEmail
            },
        })

        if (!dataUser) {
            return res.status(403).json({
                "msg": "User not found"
            });
        }

        const pass = dataUser.pass
        const verify = await comparePass(password, pass)
        if(verify){

            const payload = {
                id: dataUser.id,
                email: dataUser.email
            };

            const token = jwt.sign(payload, process.env.CODE, { expiresIn: '1h' });

            res.status(200).json({
                "msg" : "Login Success",
                "token" : token
            })  
        }else{
            res.status(403).json({
                "msg" : "User not found"
            })
        }

    } catch (error) {
        res.status(403).json({
            "msg" : "error"
        })
    }
})

app.post('/activate', (req, res) => {
    try {
        res.status(200).json({
            "msg" : "Verify Success"
        })
    } catch (error) {
        res.status(403).json({
            "msg" : error
        })
    }
})

export default app
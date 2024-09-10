import { Router } from "express";
import { postUser } from "../services/users.services.js";

const app = Router()

const postUsers = app.post('/', async (req, res) => {
    try {
        const data = req.body
        const connect = await postUser(data.nombre, data.correo, data.numero, data.pass)
        res.status(200).json({
            "msg": connect
        })
    } catch (error) {
        res.status(403).json({
            "msg":"No found"
        })
    }
})

export default app;
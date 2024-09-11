import { postUser } from "../services/users.services.js";

export const aggUsers = async (req, res) => {
    try {
        const data = req.body
        const connect = await postUser(data.nombre, data.correo, data.numero, data.pass)
        res.status(200).json({
            "msg": connect
        })
    } catch (error) {
        res.status(403).json({
            "msg": connect
        })
    }
}
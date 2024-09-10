import { PrismaClient } from "@prisma/client"
import { hashingPass } from "../utils/handlePassword.js"

const db = new PrismaClient()

export const postUser = async (name, email, phone, pass) => {
    try {
        const hashPass = await hashingPass(pass)
        const newUser = await db.usuario.create({
            data: {
                nombre: name,
                correo: email,
                numero: phone,
                pass: hashPass
            }
        })
        if(newUser.id){
            let ret = `Se ha creado el usuario: ${newUser.nombre}`
            return ret
        }else{
            let error = "User not found"
            return error
        }
    } catch (error) {
        let err = "No se pudo crear el usuario"
        return err
    }  
}
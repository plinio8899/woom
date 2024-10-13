import { PrismaClient } from "@prisma/client"
import { hashingPass } from "../utils/handlePassword.js"
import nodemailer from "nodemailer"


const db = new PrismaClient()
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'woomysoporte@gmail.com', // Tu correo de Gmail
        pass: 'Woomy202413',       // Tu contraseña de Gmail
    },
});

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


        let code = Math.floor(100000 + Math.random() * 900000);
        const newCode = await db.registerCode.create({
            data: {
                code: code
            }
        })

        const mailOptions = {
            from: 'woomysoporte@gmail.com',  // Remitente
            to: 'plinio8899@gmail.com',           // Destinatario
            subject: 'Código de Verificación',
            text: `Tu código de verificación es: ${newCode.code}`,  // Cuerpo del correo
        };

        await transporter.sendMail(mailOptions);


        if(newUser.id){
            let ret = `Se ha creado el usuario: ${newUser.nombre}`
            return ret
        }else{
            let error = "User not found"
            return error
        }
    } catch (error) {
        let err = error
        return err
    }  
}
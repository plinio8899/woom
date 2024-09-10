import express, { response } from 'express'
import dotenv from 'dotenv'
import { PrismaClient } from "@prisma/client"
import bodyParser from "body-parser";
import usersRoute from "./routes/users.routes.js"
import cors from 'cors'

const db = new PrismaClient();

const server = express()
dotenv.config()

const PORT = process.env.PORT

server.use(express.json())
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }))
server.use(cors())


server.get("/", (req, res ) => {
    try {
        res.status(200).json({
            "msg":"Welcome to Wommy API - Created by NeonBlack89"
        })
    } catch (error) {
        res.status('403')
    }
})
server.use('/users', usersRoute)


server.listen(PORT || 3000, () => {
    console.log("Server Conected - Open Port 3000")
})
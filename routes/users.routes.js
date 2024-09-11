import { Router } from "express";
import { aggUsers } from "../controllers/users.controllers.js";

const app = Router()

app.post('/', aggUsers)

export default app;


import express, { Request, Response } from "express";
import cors from "cors"
import cookiParser from "cookie-parser"
import { globalErroHandler } from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/notFounds";
import { router } from "./app/routes";


const app = express();
app.use(cookiParser());
app.use(express.json());
// app.use(express.urlencoded({extended: true}))
app.use(cors());
app.use("/api/v1", router)
app.get("/", (req:Request, res:Response)=>{
    res.send("Hello World")
})

app.use(globalErroHandler);
app.use(notFound)
export default app;
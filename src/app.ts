import express, { type Request, type Response } from "express"
import cors from "cors"
import { router } from "./router/route.js"

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/v1", router)

app.get("/", (req: Request, res: Response) => {
  res.send("API is running");
});



export default app;
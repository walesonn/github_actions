import express, { ErrorRequestHandler, NextFunction, Request, Response, Router } from "express"
import { StatusCodes } from "http-status-codes"

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    return res.send("status 200 ok")
})

router.get("*", (req: Request, res: Response, next: NextFunction) => {
    throw new Error("Page not found")
})

const app = express();

app.use(router);

app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {

    if (err) {
        return res.status(res.statusCode).send({ message: err['message'] ?? "Ocorreu um erro interno inesperado" })
    }

    next()
})

app.listen(8000, () => console.log("running"))


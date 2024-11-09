import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send({message: "Hello world"})
})

app.listen(3000, () => {
    console.log(`Server corriendo en 3000`);
})
import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send({ message: "Hello world" });
});

app.listen(3000, () => {
  console.log(`Servidor corriendo en el puerto 3000`);
});

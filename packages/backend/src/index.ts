import express, { Request, Response } from "express";
import cors from "cors";
import { router } from "./routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use(router);

app.get("/", (req: Request, res: Response) => {
  res.send({ message: "Hello world" });
});

app.listen(3000, () => {
  console.log(`Servidor corriendo en el puerto 3000`);
});

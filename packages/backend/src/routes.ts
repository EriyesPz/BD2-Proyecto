import { Router } from "express";
import { ctlUsuarios } from "./controllers/controllerUsuarios";
import { ctlAuth } from "./controllers/controllerAuth";

const router = Router();

router.get("/usuarios", ctlUsuarios);
router.post("/login", ctlAuth)

export { router };

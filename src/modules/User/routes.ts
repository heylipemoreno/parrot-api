import { Router } from "express";
import { UserController } from "./UserController";
import { auth } from "../../infra/middlewares/auth";

const router = Router();

router.post("/user", UserController.createUser);
router.delete("/user/:id([0-9]+)", [auth], UserController.deleteUser);
router.put("/user/:id([0-9]+)", [auth], UserController.editUser);
router.get("/user/:id([0-9]+)", [auth], UserController.getOneById);
router.get("/user", [auth], UserController.listAll);

export default router;

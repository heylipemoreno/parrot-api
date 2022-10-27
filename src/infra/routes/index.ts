import { Router, Request, Response } from "express";
import user from "../../modules/User/routes";
import auth from "../../modules/Auth/routes";
import post from "../../modules/Post/routes"

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  return res.json("API está rodando corretamente!");
});

routes.use(user);
routes.use(auth);
routes.use(post);

export default routes;
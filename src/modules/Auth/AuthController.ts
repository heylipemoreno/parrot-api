import { Response, Request } from "express";
import { User } from "../../entities/User";
import bcrypt from "bcryptjs";
import { userRepository } from "../../repositories/userRepository";
import * as jwt from "jsonwebtoken"
import config from "../../infra/config/config"

export class AuthController {
  
   static async login(req: Request, res: Response) {

    const { email, password } = req.body;

    if(!(email && password)) {
      return res.status(404).send("Insira um e-mail ou senha.")
  }

  let user: User

  try {
      user = await userRepository.findOneOrFail({where: {email}})
  } catch (error) {
      return res.status(401).send("E-mail não encontrado.")
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(401).send("E-mail ou senha incorretos.")
  }

  let userId = await userRepository.findOneOrFail({where: {email}})

  const token = jwt.sign(
    {id: user.id, name: user.name},
    config.jwtSecret,
    {expiresIn: "1h"}
)

  return res.json({token: token, "id": userId.id})
}
}

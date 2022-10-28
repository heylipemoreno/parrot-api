import { Request, Response } from "express";
import config from "../../infra/config/config";
import jwt from "jsonwebtoken";
import { User } from "../../entities/User";
import { userRepository } from "../../repositories/userRepository";

export class AuthController {
    static async login(req: Request, res: Response) {
        
        let { email, senha } = req.body;

        const userExists = await userRepository.findOneBy({ email });

        if((!userExists && senha)) {
            return res.status(400).send("Usuário ou senha inválidos.");
        }

        let user: User;

        try {
            user = await userRepository.findOneOrFail({ where: { email }});
        } catch (error) {
            return res.status(401).send("Usuário não encontrado.");
        }

        if(!user.UnencryptedPassword(senha)) {
            return res.status(401).send("Usuário ou senha inválidos.");
        }

        const token = jwt.sign({ idUser: user.idUser, email: user.email}, config.jwtSecret, {expiresIn: "24h"});

        return res.json(token);
    }
};
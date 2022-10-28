import { Response, Request } from "express";
import { User } from "../../entities/User";
import jwt from "jsonwebtoken";
import config from "../../infra/config/config";
import bcrypt from "bcryptjs";
import { validate } from "class-validator";
import { userRepository } from "../../repositories/userRepository";
import { QueryFailedError, EntityNotFoundError } from "typeorm";

export class UserController {
  static async createUser(req: Request, res: Response) {
    const { nome, email, senha, apartment } = req.body;
    const encryptedPw = bcrypt.hashSync(senha, 10);
    const user: User = userRepository.create({
      nome,
      email,
      senha: encryptedPw,
      apartment,
    });

    const errors = await validate(user);
    if (errors.length > 0) {
      return res.status(400).send(errors);
    }

    try {
      await userRepository.save(user);
    } catch (error) {
      if (error instanceof QueryFailedError)
        return res.status(409).send("Este e-mail já está sendo utilizado.");
      return res.status(400).json(error);
    }
    return res.status(201).json(user);
  }

  static async deleteUser(req: Request, res: Response) {
    const idUser = req.params.idUser;
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { idUser: Number(idUser) } });
    } catch (error) {
      if (error instanceof EntityNotFoundError)
        return res.status(404).send("Usuário não encontrado.");
      return res.status(500).json(error);
    }

    try {
      userRepository.delete(idUser);
    } catch (error) {
      if (error instanceof QueryFailedError)
        return res.status(400).json(error.message);
      return res.status(500).json(error);
    }

    return res.status(204).send();
  }

  static async editUser(req: Request, res: Response) {
    const idUser = req.params.idUser;

    const { nome, email, apartment, senha } = req.body;
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { idUser: Number(idUser) } });
    } catch (error) {
      if (error instanceof EntityNotFoundError)
        return res.status(404).send("Usuário não encontrado.");
      return res.status(500).json(error);
    }

    if (nome) {
      user.nome = nome;
    }
    if (email) {
      user.email = email;
    }
    if (apartment) {
      user.apartment = apartment;
    }
    if (senha) {
      user.senha = bcrypt.hashSync(senha, 10);
    }

    const errors = await validate(user);
    if (errors.length > 0) {
      return res.status(400).send(errors);
    }

    try {
      await userRepository.save(user);
    } catch (error) {
      if (error instanceof QueryFailedError)
        return res.status(409).send("Este e-mail já está sendo utilizado.");
      return res.status(500).json(error);
    }

    return res.status(204).send();
  }

  static async listAll(req: Request, res: Response) {
    let users: Array<User> = [];
    try {
      users = await userRepository.find({
        select: ["idUser", "nome", "email", "apartment"],
      });
    } catch (error) {
      if (error instanceof EntityNotFoundError)
        return res.status(404).send("Não há usuários.");
      return res.status(500).json(error);
    }
    return res.status(200).send(users);
  }

  static async getOneById(req: Request, res: Response) {
    const idUser = req.params.idUser;
    let user: User;
    try {
      user = await userRepository.findOneOrFail({
        where: { idUser: Number(idUser) },
        select: ["idUser", "nome", "email", "apartment"],
      });
    } catch (error) {
      if (error instanceof EntityNotFoundError)
        return res.status(404).send("Usuário não encontrado.");
      return res.status(500).json(error);
    }

    return res.status(200).send(user);
  }
}

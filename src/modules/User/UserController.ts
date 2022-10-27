import { Response, Request } from "express";
import { User } from "../../entities/User";
import bcrypt from "bcryptjs";
import { validate } from "class-validator";
import { userRepository } from "../../repositories/userRepository";
import { QueryFailedError, EntityNotFoundError } from "typeorm";

export class UserController {
  static async createUser(req: Request, res: Response) {
    const { name, email, password, apartment } = req.body;
    const encryptedPw = bcrypt.hashSync(password, 10);
    const user: User = userRepository.create({
      name,
      email,
      password: encryptedPw,
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
    const id = req.params.id;
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { id: Number(id) } });
    } catch (error) {
      if (error instanceof EntityNotFoundError)
        return res.status(404).send("Usuário não encontrado.");
      return res.status(500).json(error);
    }

    try {
      userRepository.delete(id);
    } catch (error) {
      if (error instanceof QueryFailedError)
        return res.status(400).json(error.message);
      return res.status(500).json(error);
    }

    return res.status(204).send();
  }

  static async editUser(req: Request, res: Response) {
    const id = req.params.id;

    const { name, email, apartment, password } = req.body;
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { id: Number(id) } });
    } catch (error) {
      if (error instanceof EntityNotFoundError)
        return res.status(404).send("Usuário não encontrado.");
      return res.status(500).json(error);
    }

    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (apartment) {
      user.apartment = apartment;
    }
    if (password) {
      user.password = bcrypt.hashSync(password, 10);
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
        select: ["id", "name", "email", "apartment"],
      });
    } catch (error) {
      if (error instanceof EntityNotFoundError)
        return res.status(404).send("Não há usuários.");
      return res.status(500).json(error);
    }
    return res.status(200).send(users);
  }

  static async getOneById(req: Request, res: Response) {
    const id = req.params.id;
    let user: User;
    try {
      user = await userRepository.findOneOrFail({
        where: { id: Number(id) },
        select: ["id", "name", "email", "apartment"],
      });
    } catch (error) {
      if (error instanceof EntityNotFoundError)
        return res.status(404).send("Usuário não encontrado.");
      return res.status(500).json(error);
    }

    return res.status(200).send(user);
  }
}

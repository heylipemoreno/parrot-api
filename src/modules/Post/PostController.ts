import { User } from "./../../entities/User";
import { userRepository } from "./../../repositories/userRepository";
import { Response, Request } from "express";
import { validate } from "class-validator";
import { postRepository } from "../../repositories/postRepository";
import { EntityNotFoundError } from "typeorm";
import { Post } from "../../entities/Post";

export class PostController {
  static async createPostbyIdUser(req: Request, res: Response) {
    const { content } = req.body;
    const { idUser } = req.params;

    let user: User;
    try {
      user = await userRepository.findOneOrFail({
        where: { id: Number(idUser) },
      });
    } catch (error) {
      if (error instanceof EntityNotFoundError)
        return res.status(404).send("Usuário não encontrado.");
      return res.status(500).json(error);
    }

    const newPost = postRepository.create({
      content,
      user_id: user,
    });
    const errors = await validate(newPost);
    if (errors.length > 0) {
      return res.status(400).send(errors);
    }

    try {
      await postRepository.save(newPost);
    } catch (error) {
      return res.status(500).json(error);
    }
    return res.status(201).json(newPost);
  }

  static async getAllPosts(req: Request, res: Response) {
    let allPosts: Array<Post> = [];
    try {
      allPosts = await postRepository.find({
        relations: {
          user_id: true,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Erro interno do servidor.");
    }

    return res.status(200).send(allPosts);
  }

  static async getPostbyUserId(req: Request, res: Response) {
    const { idUser } = req.params;
    let user: User;
    try {
      user = await userRepository.findOneOrFail({
        where: { id: Number(idUser) },
      });
    } catch (error) {
      if (error instanceof EntityNotFoundError)
        return res.status(404).send("Usuário não encontrado.");
      return res.status(500).json(error);
    }
    let allPostsByUser: Array<Post>;
    try {
      allPostsByUser = await postRepository.find({ where: { user_id: {id: Number(idUser)}} });
    } catch (error) {
      return res.status(500).json(error);
    }

    return res.send(allPostsByUser);
  }
}

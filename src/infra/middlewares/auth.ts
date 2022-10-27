import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  let jwtPayload;

  if (!authHeader) {
    return res.status(401).json({ message: "É necessário inserir um token." });
  }

  // Bearer 32423b4bjk324b23
  const [, token] = authHeader.split(" ");

  try {
    await jwt.verify(token, config.jwtSecret);
    next();
  } catch (error) {
    return res.status(401).json({ message: "É necessário inserir um token." });
  }
};

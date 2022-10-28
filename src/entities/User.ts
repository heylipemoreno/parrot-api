import { Post } from "./Post";
import bcrypt from "bcryptjs";
import {
  Column,
  Entity,
  Unique,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { Length, IsNotEmpty, IsInt, IsEmail, Min, Max } from "class-validator";

@Entity("user")
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn()
  idUser: number;

  @Column()
  @Length(4, 70)
  nome: string;

  @Column({ unique: true })
  @Length(4, 45)
  @IsEmail()
  email: string;

  @Column()
  apartment: number;

  @Column()
  @Length(5, 120)
  senha: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Post, (post) => post.user_id)
  post: Post[];

  passwordHash() {
    this.senha = bcrypt.hashSync(this.senha, 10)
}

UnencryptedPassword(UnencryptedPassword: string) {
    return bcrypt.compareSync(UnencryptedPassword, this.senha)
}
}

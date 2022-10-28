import { User } from "./User";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";

@Entity("post")
export class Post {
  @PrimaryGeneratedColumn()
  idPost: number;

  @Column()
  @Length(1, 300)
  @IsNotEmpty()
  content: string;

  @CreateDateColumn({
    nullable: false
  })
  created_at: Date;

  @UpdateDateColumn({
    nullable: false
  })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.post)
  @JoinColumn({ name: "user_id" })
  user_id: User;
}

import { isEmail } from "class-validator";
import { BlogEntity } from "src/blog/entities/blog.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"user"})
export class UserEntity {
  @PrimaryGeneratedColumn("increment")
  id:number;


  @Column()
  f_name:string;

  @Column()
  l_name:string;

  @Column()
  email:string;

  @Column({nullable:true,select:false})
  age:number;

  @CreateDateColumn()
  created_at:Date

  @OneToMany(()=>BlogEntity,blog=>blog.user)
  blogs:BlogEntity[]
}

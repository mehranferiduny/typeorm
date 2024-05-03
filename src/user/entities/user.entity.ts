import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  @Column({nullable:true})
  age:number;

  @CreateDateColumn()
  created_at:Date
}

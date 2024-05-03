import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepository:Repository<UserEntity>
  ){}
 async create(createUserDto: CreateUserDto) {
    const user= this.userRepository.create({
      f_name:"ali",
      l_name:"fereiduni",
      email:"ali2424@gmail.com",
      age:25
    })
    return await this.userRepository.save(user)
  }
 async insert(createUserDto: CreateUserDto) {

    return await this.userRepository.insert({
      f_name:"hamed",
      l_name:"hasani",
      email:"hamedkhan@gmail.com",
      age:26
    })
  }

  async findAll() {
    return await this.userRepository.findBy({});
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { ILike, LessThan, LessThanOrEqual, Like, MoreThan, MoreThanOrEqual, Not, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepository:Repository<UserEntity>
  ){}
 async create(createUserDto: CreateUserDto) {
  const {f_name,l_name,email,age}=createUserDto;
    const user= this.userRepository.create({
    f_name,l_name,email,age
    })
    return await this.userRepository.save(user)
  }
 async insert(createUserDto: CreateUserDto) {
  const {f_name,l_name,email,age}=createUserDto;
    return await this.userRepository.insert({
      f_name,l_name,email,age
    })
  }

  async findAll() {
    return await this.userRepository.find({
      //! ILIKE Like
      //! NOT
      //! MoreThan  MoreThanOrEqual LessThan  LessThanOrEqual
      where:{id:LessThanOrEqual(4)}
    });
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


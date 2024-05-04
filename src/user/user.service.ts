import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { And, FindOneOptions, FindOptionsWhere, ILike, LessThan, LessThanOrEqual, Like, MoreThan, MoreThanOrEqual, Not, Repository } from 'typeorm';
import { isDate } from 'class-validator';
import { PagenavitonDto } from './dto/pagenav-user.dto';

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

  async findAll(search:string) {

    let where:FindOptionsWhere<UserEntity>={}


     if(search && isDate(new Date(search))){

      let date=new Date(search);
      let start_at=new Date(date.setUTCHours(0,0,0))
      let finsh_at=new Date(date.setUTCHours(23,59,59))

      where['created_at']=And(MoreThanOrEqual(start_at),LessThanOrEqual(finsh_at))
     }


    return await this.userRepository.find({
      //! ILIKE Like
      //! NOT
      //! MoreThan  MoreThanOrEqual LessThan  LessThanOrEqual
      where:where
    });
  }

 async order() {
    return await this.userRepository.find({
      where:{},
      order:{f_name:"DESC"}
    });
  }


 async pageNav(pagenav:PagenavitonDto) {
  const {skip,limited,page}=this.pageNavigtin(pagenav);
    return await this.userRepository.find({
      where:{},
      order:{id:"ASC"},
      take:limited,
      skip
    });
  }
 async select() {
  
    return await this.userRepository.find({
      where:{},
     select:["f_name","age"]
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


  pageNavigtin(pagenav:PagenavitonDto){
    let{page=0,limited=3}=pagenav;
    if(!page || page <=1) page=0;
    else page= page-1;
    if(!limited || limited<=0) limited=3
    return {
      page,
      limited,
      skip:page*limited
    }
  }
}


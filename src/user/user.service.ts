import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { And, FindOneOptions, FindOptionsWhere, ILike, LessThan, LessThanOrEqual, Like, MoreThan, MoreThanOrEqual, Not, Repository } from 'typeorm';
import { isDate, isEmail } from 'class-validator';
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
 async findOne(id: number) {
    
    const user= await this.userRepository.findOneBy({id});
    if(!user) throw new NotFoundException();
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);
   
    await this.userRepository.update({id},updateUserDto);
    return {
      message:"update succesfuly"
    }
  }
  async updateuser(id: number, updateUserDto: UpdateUserDto) {
    const userx =await this.findOne(id);
   const {age,email,f_name,l_name}=updateUserDto;
   if(age) userx.age=age;
   if(email && isEmail(email)) userx.email=email;
   if(f_name)userx.f_name=f_name;
   if(l_name)userx.l_name=l_name
  
    await this.userRepository.save(userx);
    return {
      message:"update succesfuly"
    }
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


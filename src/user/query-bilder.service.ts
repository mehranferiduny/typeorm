import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { And, FindOneOptions, FindOptionsWhere, ILike, LessThan, LessThanOrEqual, Like, MoreThan, MoreThanOrEqual, Not, Repository } from 'typeorm';
import { isDate, isEmail } from 'class-validator';
import { PagenavitonDto } from './dto/pagenav-user.dto';


@Injectable()
export class UserBilderService {
  constructor(
    @InjectRepository(UserEntity) private userRepository:Repository<UserEntity>,
    // @InjectRepository(ProflieEntity) private profileRepository:Repository<ProflieEntity>
  ){}



  async findAll(search:string) {

    let where:FindOptionsWhere<UserEntity>={}


     if(search && isDate(new Date(search))){

      let date=new Date(search);
      let start_at=new Date(date.setUTCHours(0,0,0))
      let finsh_at=new Date(date.setUTCHours(23,59,59))

      where['created_at']=And(MoreThanOrEqual(start_at),LessThanOrEqual(finsh_at))
     }


     return await this.userRepository.createQueryBuilder("user").where(where).getMany();
    return await this.userRepository.find({
      //! ILIKE Like
      //! NOT
      //! MoreThan  MoreThanOrEqual LessThan  LessThanOrEqual
      where:where
    });

    
  
  }

 async order() {
  return await this.userRepository.createQueryBuilder('user').orderBy('user.age','DESC').getMany()
    return await this.userRepository.find({
      where:{},
      order:{f_name:"DESC"}
    });
  }
 async blogOfUser(id:number) {
  return await this.userRepository.createQueryBuilder('user').leftJoinAndSelect('user.blogs','blogs').getOne();
    return await this.userRepository.findOne({
      where:{id},
      relations:{
        blogs:true,
      }
    });
  }


 async pageNav(pagenav:PagenavitonDto) {
  const {skip,limited,page}=this.pageNavigtin(pagenav);
  // return await this.userRepository.createQueryBuilder('user').orderBy('user.id','ASC').take(limited).skip(skip).getMany();
    return await this.userRepository.find({
      where:{},
      order:{id:"ASC"},
      take:limited,
      skip
    });
  }
 async select() {
  return await this.userRepository.createQueryBuilder('user').addSelect('user.f_name','user.age').getMany()
  
    return await this.userRepository.find({
      where:{},
     select:["f_name","age"]
    });
  }
 async findOne(id: number) {
    const user=await this.userRepository.createQueryBuilder('user').where({id}).getOne()
    // const user= await this.userRepository.findOneBy({id});
    if(!user) throw new NotFoundException();
    return user;
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



  async findProfileWithUser(id: number) {
   const user= await this.userRepository.createQueryBuilder('user').where({id}).leftJoinAndSelect("user.profile",'profile').getOne();
    // const user= await this.userRepository.findOne({
    //   where:{id},
    //   relations:{
    //     profile:true
    //   },
    //   select:{
    //     profile:{
    //       bio:true,
    //       photo:true
    //     }
    //   }
    // });
    if(!user) throw new NotFoundException();
    return user;
  }

}


import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogEntity } from './entities/blog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogEntity) private readonly blogeRepasitory:Repository<BlogEntity> 
  ){}
 async create(createBlogDto: CreateBlogDto) {
    const {text,title,userId}=createBlogDto;
    await this.blogeRepasitory.insert({text,title,userId})
    return {
      message:"create blog succesfuly"
    }
  }

 async findAll() {
    return await  this.blogeRepasitory.find({
      relations:{user:true},
      select:{
        user:{
          f_name:true,
          l_name:true
        }}
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} blog`;
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}

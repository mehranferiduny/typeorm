import { Controller, Get, Post, Body, Patch, Param, Delete,Query, Put, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PagenavitonDto } from './dto/pagenav-user.dto';
import { ProfileUserDto } from './dto/profile-user.dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @Post('/insert')
  insert(@Body() createUserDto: CreateUserDto) {
    return this.userService.insert(createUserDto);
  }
  @Post('/profile')
  profilecreated(@Body() profileUserDto: ProfileUserDto) {
    return this.userService.profileCreated(profileUserDto);
  }

  @Get()
  findAll(@Query("search") search:string) {
    return this.userService.findAll(search);
  }
  @Get('/order')
  order() {
    return this.userService.order();
  }
  @Get('/pagenav')
  pagenav(@Query() pageniton:PagenavitonDto) {
    console.log(pageniton)
    return this.userService.pageNav(pageniton);
  }
  @Get('/select')
  selectuser() {
    return this.userService.select();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Get('/profile/:id')
  findProfileWithUser(@Param('id') id: string) {
    return this.userService.findProfileWithUser(+id);
  }
  @Get('/blogs/:userid')
  blogofUser(@Param('userid',ParseIntPipe) userid: number) {
    return this.userService.blogOfUser(userid);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
  @Put('/edeit/:id')
  updateuser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateuser(+id, updateUserDto);
  }

  @Delete('/remove/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
  @Delete('/delete/:id')
  delete(@Param('id') id: string) {
    return this.userService.delete(+id);
  }
}

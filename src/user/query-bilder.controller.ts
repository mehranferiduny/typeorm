import { Controller, Get,  Body,  Param, Query,  ParseIntPipe } from '@nestjs/common';

import { PagenavitonDto } from './dto/pagenav-user.dto';

import { UserBilderService } from './query-bilder.service';


@Controller('query-bilder')
export class UserBilderController {
  constructor(private readonly userService: UserBilderService) {}

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


}

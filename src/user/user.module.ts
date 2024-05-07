import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { ProflieEntity } from './entities/profile.entity';
import { UserBilderController } from './query-bilder.controller';
import { UserBilderService } from './query-bilder.service';

@Module({
  imports:[
  TypeOrmModule.forFeature([UserEntity,ProflieEntity])
  ],
  controllers: [UserController,UserBilderController],
  providers: [UserService,UserBilderService],
})
export class UserModule {}

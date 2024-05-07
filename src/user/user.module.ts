import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { ProflieEntity } from './entities/profile.entity';

@Module({
  imports:[
  TypeOrmModule.forFeature([UserEntity,ProflieEntity])
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

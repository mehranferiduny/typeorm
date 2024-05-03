import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
     TypeOrmModule.forRoot({
      type:"postgres",
      host:"localhost",
      port:5432,
      username:"postgres",
      password:"root",
      database:"typeorm",
      synchronize:true,
      entities:[__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities:true
     })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

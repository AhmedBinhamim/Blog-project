import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userEntity } from './models/user.entity';
import { UserController } from './controller/user.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([userEntity])
  ],
  providers: [UserService],
  controllers: [UserController] 
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { MongooseModule as NestMongooseModule } from '@nestjs/mongoose';
// import { User, UserSchema } from '../models/user.model';

@Module({
  // imports: [
  //   NestMongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  // ],
  // providers: [UserRepository],
  // exports: [UserRepository],
})
export class MongoModule {}

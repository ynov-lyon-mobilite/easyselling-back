import { Module } from '@nestjs/common';
import { AuthenticationController } from 'src/controllers/authentication.controller';
import { UserController } from 'src/controllers/user.controller';
import { AuthenticationService } from 'src/services/authentication.service';
import { UserService } from 'src/services/user.service';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { MongoModule } from './mondo.module';
import { MongooseModule } from '@nestjs/mongoose';

import config from '../configs';

@Module({
  imports: [MongooseModule.forRoot(config.mongoUrl), MongoModule, MongoModule],
  controllers: [AppController, AuthenticationController, UserController],
  providers: [AppService, AuthenticationService, UserService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AuthenticationController } from 'src/controllers/authentication.controller';
import { AuthenticationService } from 'src/services/authentication.service';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { MongoModule } from './mondo.module';

@Module({
  imports: [MongoModule],
  controllers: [AppController, AuthenticationController],
  providers: [AppService, AuthenticationService],
})
export class AppModule {}

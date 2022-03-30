import { Module } from '@nestjs/common';
import { AuthenticationController } from '../controllers/authentication.controller';
import { UserController } from '../controllers/user.controller';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { MongoModule } from './mondo.module';
import { MongooseModule } from '@nestjs/mongoose';
import { VehicleController } from '../controllers/vehicle.controller';
import { VehicleService } from '../services/vehicle.service';
import { InvoiceController } from '../controllers/invoice.controller';
import { InvoiceService } from '../services/invoice.service';
import { FileController } from '../controllers/file.controller';
import { FileService } from '../services/file.service';

import config from '../configs';
import { MailService } from '../services/mail.service';

@Module({
  imports: [MongooseModule.forRoot(config.mongoUrl), MongoModule, MongoModule],
  controllers: [
    AppController,
    AuthenticationController,
    UserController,
    VehicleController,
    InvoiceController,
    FileController,
  ],
  providers: [
    AppService,
    AuthenticationService,
    UserService,
    VehicleService,
    InvoiceService,
    FileService,
    MailService,
  ],
})
export class AppModule {}

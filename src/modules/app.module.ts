import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { MongoModule } from './mongo.module';
import { AuthenticationController } from '../controllers/authentication.controller';
import { UserController } from '../controllers/user.controller';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { VehicleController } from '../controllers/vehicle.controller';
import { VehicleService } from '../services/vehicle.service';
import { InvoiceController } from '../controllers/invoice.controller';
import { InvoiceService } from '../services/invoice.service';
import { FileController } from '../controllers/file.controller';
import { FileService } from '../services/file.service';
import { MailService } from '../services/mail.service';
import { ImportService } from '../services/import.service';

import config from '../configs';

@Module({
  imports: [
    MongooseModule.forRoot(config.mongoUrl),
    MongoModule,
    MongoModule,
    ScheduleModule.forRoot(),
  ],
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
    ImportService,
  ],
})
export class AppModule {}

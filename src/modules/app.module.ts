import { Module } from '@nestjs/common';
import { AuthenticationController } from 'src/controllers/authentication.controller';
import { UserController } from 'src/controllers/user.controller';
import { AuthenticationService } from 'src/services/authentication.service';
import { UserService } from 'src/services/user.service';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { MongoModule } from './mondo.module';
import { MongooseModule } from '@nestjs/mongoose';
import { VehicleController } from 'src/controllers/vehicle.controller';
import { VehicleService } from 'src/services/vehicle.service';
import { InvoiceController } from 'src/controllers/invoice.controller';
import { InvoiceService } from 'src/services/invoice.service';
import { FileController } from 'src/controllers/file.controller';
import { FileService } from 'src/services/file.service';

import config from '../configs';

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
  ],
})
export class AppModule {}
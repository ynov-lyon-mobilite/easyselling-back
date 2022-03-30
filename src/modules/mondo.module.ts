import { Module } from '@nestjs/common';
import { MongooseModule as NestMongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';
import { Vehicle, VehicleSchema } from '../models/vehicle.model';
import { VehicleRepository } from '../repositories/vehicle.repository';
import { Invoice, InvoiceSchema } from '../models/invoice.model';
import { InvoiceRepository } from '../repositories/invoice.repository';
import { File, FileSchema } from '../models/file.model';
import { FileRepository } from '../repositories/file.repository';
import {
  VehicleAuthorization,
  VehicleAuthorizationSchema,
} from '../models/vehicle-authorization.model';
import { VehicleAuthorizationRepository } from '../repositories/vehicle-authorization.repository';
import { VehicleBrandRepository } from '../repositories/vehicle-brand.repository';
import { VehicleModelRepository } from '../repositories/vehicle-model.repository';
import {
  VehicleBrand,
  VehicleBrandSchema,
} from '../models/vehicle-brand.model';
import {
  VehicleModel,
  VehicleModelSchema,
} from '../models/vehicle-model.model';

@Module({
  imports: [
    NestMongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    NestMongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
    NestMongooseModule.forFeature([
      { name: Vehicle.name, schema: VehicleSchema },
    ]),
    NestMongooseModule.forFeature([
      { name: Invoice.name, schema: InvoiceSchema },
    ]),
    NestMongooseModule.forFeature([
      { name: VehicleAuthorization.name, schema: VehicleAuthorizationSchema },
    ]),
    NestMongooseModule.forFeature([
      { name: VehicleBrand.name, schema: VehicleBrandSchema },
    ]),
    NestMongooseModule.forFeature([
      { name: VehicleModel.name, schema: VehicleModelSchema },
    ]),
  ],
  providers: [
    UserRepository,
    VehicleRepository,
    InvoiceRepository,
    FileRepository,
    VehicleAuthorizationRepository,
    VehicleBrandRepository,
    VehicleModelRepository,
  ],
  exports: [
    UserRepository,
    VehicleRepository,
    InvoiceRepository,
    FileRepository,
    VehicleAuthorizationRepository,
    VehicleBrandRepository,
    VehicleModelRepository,
  ],
})
export class MongoModule {}

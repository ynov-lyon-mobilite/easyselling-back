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
  ],
  providers: [
    UserRepository,
    VehicleRepository,
    InvoiceRepository,
    FileRepository,
  ],
  exports: [
    UserRepository,
    VehicleRepository,
    InvoiceRepository,
    FileRepository,
  ],
})
export class MongoModule {}

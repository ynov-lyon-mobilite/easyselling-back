import { Module } from '@nestjs/common';
import { MongooseModule as NestMongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';
import { Vehicle, VehicleSchema } from '../models/vehicle.model';
import { VehicleRepository } from '../repositories/vehicle.repository';

@Module({
  imports: [
    NestMongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    NestMongooseModule.forFeature([
      { name: Vehicle.name, schema: VehicleSchema },
    ]),
  ],
  providers: [UserRepository, VehicleRepository],
  exports: [UserRepository, VehicleRepository],
})
export class MongoModule {}

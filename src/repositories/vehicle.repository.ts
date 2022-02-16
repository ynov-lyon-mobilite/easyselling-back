import { Injectable } from '@nestjs/common';
import BaseRepository from './base.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vehicle, VehicleDocument } from '../models/vehicle.model';

@Injectable()
export class VehicleRepository extends BaseRepository<VehicleDocument> {
  @InjectModel(Vehicle.name) private model: Model<VehicleDocument>;

  constructor(@InjectModel(Vehicle.name) model: Model<VehicleDocument>) {
    super(model);
    this.model = model;
  }
}

import { Injectable } from '@nestjs/common';
import BaseRepository from './base.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  VehicleModel,
  VehicleModelDocument,
} from '../models/vehicle-model.model';

@Injectable()
export class VehicleModelRepository extends BaseRepository<VehicleModelDocument> {
  constructor(
    @InjectModel(VehicleModel.name) model: Model<VehicleModelDocument>,
  ) {
    super(model);
  }
}

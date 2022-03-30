import { Injectable } from '@nestjs/common';
import BaseRepository from './base.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  VehicleBrand,
  VehicleBrandDocument,
} from '../models/vehicle-brand.model';

@Injectable()
export class VehicleBrandRepository extends BaseRepository<VehicleBrandDocument> {
  constructor(
    @InjectModel(VehicleBrand.name) model: Model<VehicleBrandDocument>,
  ) {
    super(model);
  }
}

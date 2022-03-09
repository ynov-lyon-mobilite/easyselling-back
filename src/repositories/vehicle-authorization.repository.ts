import { Injectable } from '@nestjs/common';
import BaseRepository from './base.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  VehicleAuthorization,
  VehicleAuthorizationDocument,
} from '../models/vehicle-authorization.model';

@Injectable()
export class VehicleAuthorizationRepository extends BaseRepository<VehicleAuthorizationDocument> {
  @InjectModel(VehicleAuthorization.name)
  private model: Model<VehicleAuthorizationDocument>;

  constructor(
    @InjectModel(VehicleAuthorization.name)
    model: Model<VehicleAuthorizationDocument>,
  ) {
    super(model);
    this.model = model;
  }
}

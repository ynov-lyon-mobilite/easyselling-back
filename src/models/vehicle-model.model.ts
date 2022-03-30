import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { VehicleBrand } from './vehicle-brand.model';
import { VehicleType } from './vehicle.model';

export type VehicleModelDocument = VehicleModel & Document;

@Schema()
export class VehicleModel {
  _id: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: VehicleBrand.name })
  brand: Types.ObjectId;

  @Prop({ required: true })
  model: string;

  @Prop({ required: true })
  type: VehicleType;

  @Prop({ select: false })
  __v: number;
}

export const VehicleModelSchema = SchemaFactory.createForClass(VehicleModel);

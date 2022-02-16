import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.model';

export type VehicleDocument = Vehicle & Document;

@Schema()
export class Vehicle {
  _id: Types.ObjectId;

  @Prop({ required: true })
  license: string;

  @Prop({ required: true })
  model: string;

  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  type: VehicleType;

  @Prop({ required: true })
  year: string;

  @Prop({ required: true, type: Types.ObjectId, ref: User.name })
  owner: Types.ObjectId;

  @Prop({ select: false })
  __v: number;
}

export enum VehicleType {
  car = 'car',
  moto = 'moto',
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);

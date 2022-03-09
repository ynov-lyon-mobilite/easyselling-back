import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.model';
import { Vehicle } from './vehicle.model';

export type VehicleAuthorizationDocument = VehicleAuthorization & Document;

@Schema()
export class VehicleAuthorization {
  _id: Types.ObjectId;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: Vehicle.name,
  })
  vehicle: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: User.name })
  user: Types.ObjectId;

  @Prop({ default: false })
  isActive: string;

  @Prop()
  activationDate: Date;

  @Prop()
  expirationDate: Date;

  @Prop({ select: false })
  __v: number;
}

export const VehicleAuthorizationSchema =
  SchemaFactory.createForClass(VehicleAuthorization);

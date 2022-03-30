import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type VehicleBrandDocument = VehicleBrand & Document;

@Schema()
export class VehicleBrand {
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;
}

export const VehicleBrandSchema = SchemaFactory.createForClass(VehicleBrand);

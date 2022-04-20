import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Vehicle } from './vehicle.model';
import { File } from './file.model';

export type InvoiceDocument = Invoice & Document;

@Schema()
export class Invoice {
  _id: Types.ObjectId;

  @Prop()
  label?: string;

  @Prop({ required: true })
  mileage: number;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true, type: Types.ObjectId, ref: Vehicle.name })
  vehicle: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: File.name })
  file: Types.ObjectId;

  @Prop({ select: false })
  __v: number;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);

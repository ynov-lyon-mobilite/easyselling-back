import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ select: false, required: true })
  firebaseId: string;

  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop({ select: false })
  __v: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

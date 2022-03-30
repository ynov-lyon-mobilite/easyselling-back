import { Injectable } from '@nestjs/common';
import BaseRepository from './base.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invoice, InvoiceDocument } from '../models/invoice.model';

@Injectable()
export class InvoiceRepository extends BaseRepository<InvoiceDocument> {
  constructor(@InjectModel(Invoice.name) model: Model<InvoiceDocument>) {
    super(model);
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { APIDto } from '../dto/api.dto';
import { InvoiceRepository } from '../repositories/invoice.repository';
import { InvoiceDTO } from '../dto/invoice.dto';

@Injectable()
export class InvoiceService {
  constructor(private readonly invoiceRepository: InvoiceRepository) {}

  getInvoicesForVehicle = async (vehicleId: string) => {
    return new APIDto(
      await this.invoiceRepository.findManyBy(
        { vehicle: vehicleId },
        { populate: ['file'] },
      ),
    );
  };

  createInvoiceForVehicle = async (
    vehicleId: string,
    parameters: InvoiceDTO,
  ) => {
    const invoice = await this.invoiceRepository.insert({
      ...parameters,
      vehicle: vehicleId,
    });

    return new APIDto(
      await this.invoiceRepository.findOneById(invoice._id, {
        populate: ['file'],
      }),
    );
  };

  updateInvoice = async (invoiceId: string, parameters: InvoiceDTO) => {
    // @ts-ignore
    await this.invoiceRepository.updateOneBy({ _id: invoiceId }, parameters);
  };

  deleteInvoice = async (invoiceId: string) => {
    try {
      await this.invoiceRepository.deleteOnyBy({ _id: invoiceId });
    } catch (e) {
      console.log(e);
      throw new BadRequestException();
    }
  };
}

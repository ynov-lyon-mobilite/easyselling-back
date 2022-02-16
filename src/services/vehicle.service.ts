import { BadRequestException, Injectable } from '@nestjs/common';
import { APIDto } from 'src/dto/api.dto';
import { VehicleDTO } from 'src/dto/vehicle.dto';
import { User } from 'src/models/user.model';
import { VehicleRepository } from '../repositories/vehicle.repository';

@Injectable()
export class VehicleService {
  constructor(private readonly vehicleRepository: VehicleRepository) {}

  getAll = async (user: User) => {
    return new APIDto(
      await this.vehicleRepository.findManyBy({ owner: user._id }),
    );
  };

  createVehicle = async (user: User, parameters: VehicleDTO) => {
    return new APIDto(
      await this.vehicleRepository.insert({ ...parameters, owner: user._id }),
    );
  };

  updateVehicle = async (vehicleId: string, parameters: VehicleDTO) => {
    // @ts-ignore
    await this.vehicleRepository.updateOneBy({ _id: vehicleId }, parameters);
  };

  deleteVehicle = async (vehicleId: string) => {
    try {
      await this.vehicleRepository.deleteOnyBy({ _id: vehicleId });
    } catch (e) {
      console.log(e);
      throw new BadRequestException();
    }
  };
}

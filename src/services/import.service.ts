import { Injectable } from '@nestjs/common';
import { VehicleBrandRepository } from '../repositories/vehicle-brand.repository';
import { VehicleModelRepository } from '../repositories/vehicle-model.repository';
import * as vehiclesBrands from '../data/vehicles-brands.json';
import * as carModels from '../data/car-models.json';
import * as motoModels from '../data/moto-models.json';
import { VehicleType } from '../models/vehicle.model';

@Injectable()
export class ImportService {
  constructor(
    private readonly brandRepository: VehicleBrandRepository,
    private readonly vehicleModelRepository: VehicleModelRepository,
  ) {}

  import = async () => {
    const brandPromises = vehiclesBrands.map(async (brand) => {
      const savedBrand = await this.brandRepository.insert({
        name: brand.brandName,
      });

      return { ...brand, mongoId: savedBrand._id };
    });

    const brandResult = await Promise.all(brandPromises);

    const carsPromises = carModels.map(async (car) => {
      const brand = brandResult.find((brand) => brand.id === car.brand);
      await this.vehicleModelRepository.insert({
        brand: brand.mongoId,
        model: car.model,
        type: VehicleType.car,
      });
    });

    const motosPromises = motoModels.map(async (moto) => {
      const brand = brandResult.find((brand) => brand.id === moto.brand);
      await this.vehicleModelRepository.insert({
        brand: brand.mongoId,
        model: moto.model,
        type: VehicleType.moto,
      });
    });

    await Promise.all([...carsPromises, ...motosPromises]);
  };
}

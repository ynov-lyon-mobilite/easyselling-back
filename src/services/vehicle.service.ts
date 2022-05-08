import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as moment from 'moment';
import { Cron } from '@nestjs/schedule';
import { APIDto } from '../dto/api.dto';
import { VehicleDTO } from '../dto/vehicle.dto';
import { User } from '../models/user.model';
import { VehicleRepository } from '../repositories/vehicle.repository';
import { UserRepository } from '../repositories/user.repository';
import { VehicleAuthorizationRepository } from '../repositories/vehicle-authorization.repository';
import { MailService, MailTemplate } from './mail.service';
import { VehicleBrandRepository } from '../repositories/vehicle-brand.repository';
import { VehicleModelRepository } from '../repositories/vehicle-model.repository';

import config from '../configs';

@Injectable()
export class VehicleService {
  constructor(
    private readonly vehicleRepository: VehicleRepository,
    private readonly vehicleBrandRepository: VehicleBrandRepository,
    private readonly vehicleModelRepository: VehicleModelRepository,
    private readonly userRepository: UserRepository,
    private readonly vehicleAuthorizationRepository: VehicleAuthorizationRepository,
    private readonly mailService: MailService,
  ) {}

  getAll = async (user: User) => {
    return new APIDto(
      await this.vehicleRepository.findManyBy({ owner: user._id }),
    );
  };

  getSharedVehicles = async (user: User) => {
    const authorizations = await this.vehicleAuthorizationRepository.findManyBy(
      { user: user._id, isActive: true },
    );

    const vehiclesPromises = authorizations
      .filter((authorization) =>
        moment(authorization.expirationDate).isAfter(moment()),
      )
      .map((authorization) =>
        // @ts-ignore
        this.vehicleRepository.findOneById(authorization.vehicle),
      );

    return new APIDto(await Promise.all(vehiclesPromises));
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

  sendShareInvitation = async (vehicleId: string, email: string) => {
    const user = await this.userRepository.findOneBy({ email });
    const vehicle = await this.vehicleRepository.findOneById(vehicleId);

    if (!user || !vehicle) {
      throw new BadRequestException();
    }

    const authorization = await this.vehicleAuthorizationRepository.insert({
      vehicle: vehicle._id,
      user: user._id,
    });

    const url = `${config.apiUrl}/vehicles/share?id=${authorization._id}`;

    await this.mailService.sendMail({
      to: email,
      data: { url },
      template: MailTemplate.shareVehicle,
    });
  };

  activeShareInvitation = async (authorizationId: string, user: User) => {
    const authorization = await this.vehicleAuthorizationRepository.findOneById(
      authorizationId,
    );

    if (!authorization || !user._id.equals(authorization.user)) {
      throw new UnauthorizedException();
    }

    await this.vehicleAuthorizationRepository.updateOneBy(
      { _id: authorizationId },
      {
        isActive: true,
        // @ts-ignore
        activationDate: moment(),
        // @ts-ignore
        expirationDate: moment().add(1, 'day'),
      },
    );
  };

  @Cron('*/5 * * * * *')
  async deactivateShareInvitation() {
    const authorizations = await this.vehicleAuthorizationRepository.findManyBy(
      { isActive: true },
    );

    authorizations.map((authorization) => {
      if (moment(authorization.expirationDate).isBefore(moment())) {
        this.vehicleAuthorizationRepository.updateOneBy(
          { _id: authorization._id },
          { isActive: false },
        );
      }
    });
  }

  getAllModels = async () => {
    return new APIDto(await this.vehicleModelRepository.findAll());
  };

  getAllBrands = async () => {
    return new APIDto(await this.vehicleBrandRepository.findAll());
  };
}

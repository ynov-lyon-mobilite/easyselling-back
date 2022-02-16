import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { VehicleRepository } from '../repositories/vehicle.repository';

@Injectable()
export class VehicleOwnerGuard implements CanActivate {
  constructor(private readonly vehicleRepository: VehicleRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const vehicle = await this.vehicleRepository.findOneById(
      request.params.vehicleId,
    );

    if (!vehicle || String(vehicle.owner) !== String(request.user._id)) {
      throw new UnauthorizedException();
    }

    return true;
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { User } from 'src/models/user.model';
import config from '../configs';
import { APIDto } from '../dto/api.dto';
import { UserDTO } from '../dto/user.dto';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  updateUser = async (
    userId: string,
    parameters: UserDTO,
  ): Promise<APIDto<User>> => {
    // @ts-ignore
    const user = this.userRepository.updateOneBy({ _id: userId }, parameters);

    return new APIDto(user);
  };

  registerUser = async (parameters: UserDTO): Promise<APIDto<User>> => {
    const { email, password, firstname, lastname } = parameters;
    const data = JSON.stringify({ email, password, returnSecureToken: true });

    try {
      const result = await axios({
        method: 'post',
        url: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${config.firebase.apiKey}`,
        headers: { 'Content-Type': 'application/json' },
        data: data,
      });

      const { localId: firebaseId } = result.data;

      const savedUser = await this.userRepository.insert({
        email,
        firstname,
        lastname,
        firebaseId,
      });

      return new APIDto(await this.userRepository.findOneById(savedUser._id));
    } catch (e) {
      console.log(e);
      throw new BadRequestException();
    }
  };
}

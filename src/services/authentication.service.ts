import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from 'src/dto/login.dto';
import axios from 'axios';

import { APIDto } from 'src/dto/api.dto';
import config from '../configs';
import { RefreshDTO } from '../dto/refresh.dto';

@Injectable()
export class AuthenticationService {
  login = async (parameters: LoginDTO) => {
    const data = JSON.stringify({ ...parameters, returnSecureToken: true });

    try {
      const result = await axios({
        method: 'post',
        url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${config.firebaseApiKey}`,
        headers: { 'Content-Type': 'application/json' },
        data: data,
      });

      const { idToken, refreshToken } = result.data;

      return new APIDto({ access_token: idToken, refresh_token: refreshToken });
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException({ error: 'BAD_CREDENTIALS' });
    }
  };

  refreshToken = async ({ refresh_token }: RefreshDTO) => {
    const data = JSON.stringify({ grant_type: 'refresh_token', refresh_token });

    try {
      const result = await axios({
        method: 'post',
        url: `https://securetoken.googleapis.com/v1/token?key=${config.firebaseApiKey}`,
        headers: { 'Content-Type': 'application/json' },
        data: data,
      });

      const { access_token, refresh_token } = result.data;

      return new APIDto({ access_token, refresh_token });
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException({ error: 'BAD_CREDENTIALS' });
    }
  };
}

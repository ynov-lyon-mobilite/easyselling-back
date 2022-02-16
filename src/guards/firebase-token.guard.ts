import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import app from '../configs/firebase.config';
// import { UserService } from '../modules/users/user.service';

@Injectable()
export class FirebaseTokenGuard implements CanActivate {
  // constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace(/^Bearer\s/, '');

    try {
      const decodedToken = await app.auth().verifyIdToken(token, true);
      request.firebaseUser = await app.auth().getUser(decodedToken.uid);
      // request.user = await this.userService.getCurrentUser(
      //   request.firebaseUser,
      // );

      return true;
    } catch {
      return false;
    }
  }
}

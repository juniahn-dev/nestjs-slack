import { Injectable, UnauthorizedException } from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validator(email: string, passowrd: string, done: CallableFunction) {
    const user = await this.authService.validateUser(email, passowrd);
    if (!user) {
      throw new UnauthorizedException();
    }
    return done(null, user);
  }
}

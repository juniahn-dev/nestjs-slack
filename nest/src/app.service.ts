import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {
  constructor(private userService: UsersService) {}

  getUser(): string {
    this.userService.getUser();

    return process.env.SECRET;
  }
}

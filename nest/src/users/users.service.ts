import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  getUser() {}

  async join(email: string, nickname: string, password: string) {
    if (!email) {
      throw new HttpException('Is empty Email', 400);
    }

    if (!nickname) {
      throw new HttpException('Is empty Nickname', 400);
    }

    if (!password) {
      throw new HttpException('Is empty Password', 400);
    }

    const user = await this.usersRepository.findOne({ where: { email } });

    if (user) {
      throw new HttpException('Already existed User', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await this.usersRepository.save({
      email,
      nickname,
      password: hashedPassword,
    });
  }
}

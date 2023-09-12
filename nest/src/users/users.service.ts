import { Injectable } from '@nestjs/common';
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
      throw new Error('Is empty Email');
    }

    if (!nickname) {
      throw new Error('Is empty Nickname');
    }

    if (!password) {
      throw new Error('Is empty Password');
    }

    const user = await this.usersRepository.findOne({ where: { email } });

    if (user) {
      throw new Error('Already existed User');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await this.usersRepository.save({
      email,
      nickname,
      password: hashedPassword,
    });
  }
}

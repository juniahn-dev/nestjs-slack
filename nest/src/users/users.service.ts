import { Injectable, UnauthorizedException } from '@nestjs/common';

import { ChannelMembers } from '../entities/ChannelMembers';
import { DataSource, Repository } from 'typeorm';
import { Users } from '../entities/Users';
import { WorkspaceMembers } from '../entities/WorkspaceMembers';
import bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    private dataSource: DataSource,
  ) {}

  async findByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });
  }

  async join(email: string, nickname: string, password: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const user = await queryRunner.manager
      .getRepository(Users)
      .findOne({ where: { email } });

    if (user) {
      throw new UnauthorizedException('Already existed User');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    try {
      const returned = await queryRunner.manager.getRepository(Users).save({
        email,
        nickname,
        password: hashedPassword,
      });
      await queryRunner.manager.getRepository(WorkspaceMembers).save({
        UserId: returned.id,
        WorkspaceId: 1,
      });
      await queryRunner.manager.getRepository(ChannelMembers).save({
        UserId: returned.id,
        ChannelId: 1,
      });
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new UnauthorizedException(error);
    } finally {
      await queryRunner.release();
    }

    return true;
  }
}

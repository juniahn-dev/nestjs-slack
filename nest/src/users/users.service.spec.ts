import { Test, TestingModule } from '@nestjs/testing';

import { ChannelMembers } from 'src/entities/ChannelMembers';
import { Users } from 'src/entities/Users';
import { UsersService } from './users.service';
import { WorkspaceMembers } from 'src/entities/WorkspaceMembers';
import { getRepositoryToken } from '@nestjs/typeorm';

class MockUserRepository {
  #data = [{ id: 1, email: 'gud0415@gmail.com' }];
  findOne({ where: { email } }) {
    const data = this.#data.find((v) => v.email === email);
    if (data) {
      return data;
    }
    return null;
  }
}
class MockWorkspaceMembersRepository {}
class MockChannelMembersRepository {}

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useClass: MockUserRepository,
        },
        {
          provide: getRepositoryToken(WorkspaceMembers),
          useClass: MockWorkspaceMembersRepository,
        },
        {
          provide: getRepositoryToken(ChannelMembers),
          useClass: MockChannelMembersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findByEmail function is find to user by email', () => {
    expect(service.findByEmail('gud0415@gmail.com')).resolves.toStrictEqual({
      email: 'gud0415@gmail.com',
      id: 1,
    });
  });

  it('if findByEmail function is not find a user, must return null', () => {
    expect(service.findByEmail('gud041@gmail.com')).resolves.toBe(null);
  });
});

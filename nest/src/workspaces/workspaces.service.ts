import { ChannelMembers } from 'src/entities/ChannelMembers';
import { Channels } from 'src/entities/Channels';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from 'src/entities/Users';
import { WorkspaceMembers } from 'src/entities/WorkspaceMembers';
import { Workspaces } from 'src/entities/Workspaces';

@Injectable()
export class WorkspacesService {
  @InjectRepository(Workspaces)
  private workspacesRepository: Repository<Workspaces>;
  @InjectRepository(Channels)
  private channelsRepository: Repository<Channels>;
  @InjectRepository(WorkspaceMembers)
  private workspaceMembersRepository: Repository<WorkspaceMembers>;
  @InjectRepository(ChannelMembers)
  private channelMembersRepository: Repository<ChannelMembers>;
  @InjectRepository(Users)
  private usersRepository: Repository<Users>;

  async findById(id: number) {
    return this.workspacesRepository.findOne({ where: { id } });
  }

  async findMyWorkspaces(myId: number) {
    return this.workspacesRepository.find({
      where: { WorkspaceMembers: [{ UserId: myId }] },
    });
  }

  async createWorkspace(name: string, url: string, myId: number) {}
}

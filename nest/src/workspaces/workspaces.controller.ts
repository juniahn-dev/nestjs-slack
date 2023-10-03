import { Body, Controller, Delete, Get, Post } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { WorkspacesService } from './workspaces.service';
import { User } from 'src/common/decorators/user.decorator';
import { Users } from 'src/entities/Users';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';

@ApiTags('WORKSPACE')
@Controller('api/workspaces')
export class WorkspacesController {
  constructor(private workspacesService: WorkspacesService) {}

  @Get()
  getMyWorkspaces(@User() user: Users) {
    return this.workspacesService.findMyWorkspaces(user.id);
  }

  @Post()
  createWorkspaces(@User() user: Users, @Body() body: CreateWorkspaceDto) {
    return this.workspacesService.createWorkspace(
      body.workspace,
      body.url,
      body.id,
    );
  }

  @Get(':url/members')
  getAllMembersFromWorkspace() {}

  @Post(':url/members')
  inviteMembersFromWorkspace() {}

  @Delete(':url/members')
  kickMembersFromWorkspace() {}

  @Get(':url/members')
  getMemberInfoInWorkspace() {}
}

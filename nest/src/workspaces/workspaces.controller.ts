import { Controller, Delete, Get, Post } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

@ApiTags('WORKSPACE')
@Controller('api/workspaces')
export class WorkspacesController {
  @Get()
  getMyWorkspaces() {}

  @Post()
  createWorkspaces() {}

  @Get(':url/members')
  getAllMembersFromWorkspace() {}

  @Post(':url/members')
  inviteMembersFromWorkspace() {}

  @Delete(':url/members')
  kickMembersFromWorkspace() {}

  @Get(':url/members')
  getMemberInfoInWorkspace() {}
}

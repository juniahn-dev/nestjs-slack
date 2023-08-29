import { Controller, Delete, Get, Post } from '@nestjs/common';

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

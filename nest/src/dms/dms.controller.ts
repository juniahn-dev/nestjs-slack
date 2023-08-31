import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('DM')
@Controller('api/workspaces/:url/dms')
export class DmsController {
  @ApiParam({
    name: 'url',
    description: 'Workspace url',
    required: true,
  })
  @ApiParam({
    name: 'id',
    description: 'User id',
    required: true,
  })
  @ApiQuery({
    name: 'perPage',
    description: 'Number taken at a time',
    required: true,
  })
  @ApiQuery({
    name: 'page',
    description: 'Page to load',
    required: true,
  })
  @Get(':id/chats')
  getChats(@Query() query, @Param() param) {
    console.log(query.perPage, query.page);
    console.log(param.id, param.url);
  }

  @Post(':id/chats')
  postChats(@Body() body) {}
}

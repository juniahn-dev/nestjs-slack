import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { Workspaces } from 'src/entities/Workspaces';

export class CreateWorkspaceDto extends PickType(Workspaces, [
  'id',
  'url',
] as const) {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'slack',
    description: 'Name of workspace',
  })
  public workspace: string;
}

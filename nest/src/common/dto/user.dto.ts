import { ApiProperty } from '@nestjs/swagger';
import { JoinRequestDto } from 'src/users/dto/join.request.dto';

export class UserDto extends JoinRequestDto {
  @ApiProperty({
    example: 1,
    description: 'id',
    required: true,
  })
  id: number;
}
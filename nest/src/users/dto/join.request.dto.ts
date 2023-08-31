import { ApiProperty } from '@nestjs/swagger';

export class JoinRequestDto {
  @ApiProperty({
    example: 'gud0415@gmail.com',
    description: 'email',
    required: true,
  })
  public email: string;

  @ApiProperty({
    example: 'juniahn',
    description: 'nickname',
    required: true,
  })
  public nickname: string;

  @ApiProperty({
    example: 'password123',
    description: 'password',
    required: true,
  })
  public password: string;
}

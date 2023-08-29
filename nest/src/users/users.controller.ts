import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(@Req() req) {
    return req.users;
  }

  @Post()
  postUsers(@Body() body: JoinRequestDto) {
    this.usersService.postUsers(body.email, body.nickname, body.password);
  }

  @Post('login')
  login(@Req() req) {
    return req.users;
  }

  @Post('logout')
  logout(@Req() req, @Res() res) {
    req.logout();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}

import { DMs } from 'src/entities/DMs';
import { DMsController } from './dms.controller';
import { DMsService } from './dms.service';
import { EventsModule } from 'src/events/events.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Workspaces } from 'src/entities/Workspaces';

@Module({
  imports: [TypeOrmModule.forFeature([DMs, Users, Workspaces]), EventsModule],
  controllers: [DMsController],
  providers: [DMsService],
})
export class DmsModule {}

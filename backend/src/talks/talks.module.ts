import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CyclesModule } from '../cycles/cycles.module';
import { TalksService } from './talks.service';
import { TalksController } from './talks.controller';
import { Talk } from './entities/talk.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Talk]), CyclesModule],
  controllers: [TalksController],
  providers: [TalksService],
})
export class TalksModule {}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TalksService } from './talks.service';
import { CreateTalkDto } from './dto/create-talk.dto';
import { UpdateTalkDto } from './dto/update-talk.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { Serialize } from '../common/interceptors/serialize.interceptor';
import { TalkDto } from './dto/talk.dto';

@Controller('talks')
@Serialize(TalkDto)
export class TalksController {
  constructor(private readonly talksService: TalksService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.talksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.talksService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createTalkDto: CreateTalkDto) {
    return this.talksService.create(createTalkDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateTalkDto: UpdateTalkDto) {
    return this.talksService.update(id, updateTalkDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.talksService.remove(id);
  }
}

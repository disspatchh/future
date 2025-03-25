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
import { CyclesService } from './cycles.service';
import { CreateCycleDto } from './dto/create-cycle.dto';
import { UpdateCycleDto } from './dto/update-cycle.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { Serialize } from '../common/interceptors/serialize.interceptor';
import { CycleDto } from './dto/cycle.dto';

@Controller('cycles')
@Serialize(CycleDto)
export class CyclesController {
  constructor(private readonly cyclesService: CyclesService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.cyclesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cyclesService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createCycleDto: CreateCycleDto) {
    return this.cyclesService.create(createCycleDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateCycleDto: UpdateCycleDto) {
    return this.cyclesService.update(id, updateCycleDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.cyclesService.remove(id);
  }
}

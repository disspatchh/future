import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Talk } from './entities/talk.entity';
import { CreateTalkDto } from './dto/create-talk.dto';
import { UpdateTalkDto } from './dto/update-talk.dto';
import { CyclesService } from '../cycles/cycles.service';

@Injectable()
export class TalksService {
  constructor(
    @InjectRepository(Talk) private readonly repo: Repository<Talk>,
    private readonly cyclesService: CyclesService,
  ) {}

  async create(createTalkDto: CreateTalkDto) {
    const cycle = await this.cyclesService.findOne(createTalkDto.cycleId);
    const talk = this.repo.create({ ...createTalkDto, cycle });
    return this.repo.save(talk);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    if (!id) return null;
    return this.repo.findOne({ where: { id } });
  }

  async update(id: string, updateTalkDto: UpdateTalkDto) {
    const talk = await this.repo.findOne({ where: { id } });
    if (!talk) {
      throw new NotFoundException('Talk not found.');
    }

    const entries = Object.entries(updateTalkDto);
    if (!entries.length) {
      throw new BadRequestException('No property changes were provided.');
    }

    entries.forEach(([key, value]) => {
      talk[key] = value;
    });

    return this.repo.save(talk);
  }

  async remove(id: string) {
    const talk = await this.findOne(id);
    if (!talk) {
      throw new NotFoundException('Talk not found.');
    }
    return this.repo.remove(talk);
  }
}

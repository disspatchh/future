import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cycle } from './entities/cycle.entity';
import { CreateCycleDto } from './dto/create-cycle.dto';
import { UpdateCycleDto } from './dto/update-cycle.dto';
import { Project } from '../projects/entities/project.entity';
import { ProjectsService } from '../projects/projects.service';

@Injectable()
export class CyclesService {
  constructor(
    @InjectRepository(Cycle) private readonly repo: Repository<Cycle>,
    private readonly projectsService: ProjectsService,
  ) {}

  async create(createCycleDto: CreateCycleDto) {
    const project: Project = await this.projectsService.findOne(
      createCycleDto.projectId,
    );
    const cycle: Cycle = this.repo.create({
      ...createCycleDto,
      project,
    });
    return this.repo.save(cycle);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    if (!id) return null;
    return this.repo.findOne({ where: { id }, relations: ['talks'] });
  }

  async update(id: string, updateCycleDto: UpdateCycleDto) {
    const cycle = await this.repo.findOne({ where: { id } });
    if (!cycle) {
      throw new NotFoundException('Talk not found.');
    }

    const entries = Object.entries(updateCycleDto);
    if (!entries.length) {
      throw new BadRequestException('No property changes were provided.');
    }

    entries.forEach(([key, value]) => {
      cycle[key] = value;
    });

    return this.repo.save(cycle);
  }

  async remove(id: string) {
    const cycle = await this.findOne(id);
    if (!cycle) {
      throw new NotFoundException('Cycle not found.');
    }
    return this.repo.remove(cycle);
  }
}

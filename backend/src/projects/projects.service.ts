import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private readonly repo: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const project: Project = this.repo.create(createProjectDto);
    return this.repo.save(project);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    if (!id) return null;
    return this.repo.findOne({ where: { id }, relations: ['cycles'] });
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.repo.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException('Talk not found.');
    }

    const entries = Object.entries(updateProjectDto);
    if (!entries.length) {
      throw new BadRequestException('No property changes were provided.');
    }

    entries.forEach(([key, value]) => {
      project[key] = value;
    });

    return this.repo.save(project);
  }

  async remove(id: string) {
    const project = await this.findOne(id);
    if (!project) {
      throw new NotFoundException('Project not found.');
    }
    return this.repo.remove(project);
  }
}

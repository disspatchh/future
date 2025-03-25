import { Expose, Type, Transform } from 'class-transformer';
import { CycleDto } from '../../cycles/dto/cycle.dto';

export class ProjectDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  @Type(() => CycleDto)
  cycles: CycleDto[];
}

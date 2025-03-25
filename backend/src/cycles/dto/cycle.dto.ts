import { Expose, Exclude, Type } from 'class-transformer';
import { TalkDtoNoContent } from '../../talks/dto/talk.dto';

export class CycleDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  viewCount: number;

  @Expose()
  projectId: string;

  @Expose()
  @Type(() => TalkDtoNoContent)
  talks: TalkDtoNoContent[];
}

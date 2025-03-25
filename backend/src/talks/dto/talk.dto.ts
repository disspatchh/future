import { Expose, Exclude } from 'class-transformer';

export class TalkDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  content: string;

  @Expose()
  cycleId: string;
}

export class TalkDtoNoContent extends TalkDto {
  @Exclude()
  content: string;
}

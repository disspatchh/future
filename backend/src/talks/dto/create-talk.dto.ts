import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTalkDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  @IsUUID()
  cycleId: string;
}

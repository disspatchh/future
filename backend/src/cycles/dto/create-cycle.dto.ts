import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateCycleDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsUUID()
  projectId: string;
}

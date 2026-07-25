import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional } from 'class-validator';
import { CreateHabitDto } from './create-habit.dto';

export enum HabitStatusDto {
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export class UpdateHabitDto extends PartialType(CreateHabitDto) {
  @IsOptional()
  @IsEnum(HabitStatusDto)
  status?: HabitStatusDto;
}
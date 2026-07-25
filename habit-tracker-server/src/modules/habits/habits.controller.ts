import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { QueryCheckInsDto } from './dto/query-checkins.dto';
import { CurrentUser } from 'src/core/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { HabitsService } from './habits.service';

@UseGuards(JwtAuthGuard)
@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Post()
  create(@CurrentUser() userId: number, @Body() dto: CreateHabitDto) {
    return this.habitsService.create(userId, dto);
  }

  /** All habit's */
  @Get()
  findAll(@CurrentUser() userId: number) {
    return this.habitsService.findAllForUser(userId);
  }

  /** Detail view */
  @Get(':id')
  findOne(
    @CurrentUser() userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Query() query: QueryCheckInsDto,
  ) {
    return this.habitsService.findOneForUser(userId, id, query.days);
  }

  @Patch(':id')
  update(
    @CurrentUser() userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateHabitDto,
  ) {
    return this.habitsService.update(userId, id, dto);
  }

  /** Soft delete */
  @Delete(':id')
  archive(@CurrentUser() userId: number, @Param('id', ParseIntPipe) id: number) {
    return this.habitsService.archive(userId, id);
  }

  @Put(':id/checkins/today')
  markTodayDone(
    @CurrentUser() userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.habitsService.markTodayDone(userId, id);
  }

  @Delete(':id/checkins/today')
  unmarkToday(
    @CurrentUser() userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.habitsService.unmarkToday(userId, id);
  }

  @Get(':id/checkins')
  getCheckIns(
    @CurrentUser() userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Query() query: QueryCheckInsDto,
  ) {
    return this.habitsService.getCheckIns(userId, id, query.days);
  }
}
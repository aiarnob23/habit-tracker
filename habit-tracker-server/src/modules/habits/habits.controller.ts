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
} from '@nestjs/common';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { QueryCheckInsDto } from './dto/query-checkins.dto';
import { CurrentUser } from 'src/core/decorators/current-user.decorator';
import { HabitsService } from './habits.service';

@Controller('habits')
export class HabitsController {
    constructor(private readonly habitsService: HabitsService) { }

    @Post()
    create(@CurrentUser('userId') userId: number, @Body() dto: CreateHabitDto) {
        return this.habitsService.create(userId, dto);
    }

    /** All habit's */
    @Get()
    async findAll(@CurrentUser('userId') userId: number) {
        const habits = await this.habitsService.findAllForUser(userId);
        return {
            message: 'All habits fetched successfully',
            data: habits,
        }
    }

    /** Archived habits */
    @Get('archived')
    async findArchived(@CurrentUser('userId') userId: number) {
        const habits = await this.habitsService.findArchivedForUser(userId);
        return {
            message: 'Archived habits fetched successfully',
            data: habits,
        };
    }

    /** Detail view */
    @Get(':id')
    async findOne(
        @CurrentUser('userId') userId: number,
        @Param('id', ParseIntPipe) id: number,
        @Query() query: QueryCheckInsDto,
    ) {
        const habit = await this.habitsService.findOneForUser(userId, id, query.days);
        return {
            message: 'Habit detail fetched successfully',
            data: habit,
        }
    }

    /** Update */
    @Patch(':id')
    update(
        @CurrentUser('userId') userId: number,
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateHabitDto,
    ) {
        return this.habitsService.update(userId, id, dto);
    }

    /**  Archive */
    @Patch(':id/archive')
    archive(
        @CurrentUser('userId') userId: number,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.habitsService.archive(userId, id);
    }
    /** Mark today done */
    @Put(':id/checkins/today')
    completeToday(
        @CurrentUser('userId') userId: number,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.habitsService.markTodayDone(userId, id);
    }

    /** Unmark today */
    @Delete(':id/checkins/today')
    removeTodayCompletion(
        @CurrentUser('userId') userId: number,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.habitsService.unmarkToday(userId, id);
    }

    /** Get check-ins */
    @Get(':id/checkins')
    async getCheckIns(
        @CurrentUser('userId') userId: number,
        @Param('id', ParseIntPipe) id: number,
        @Query() query: QueryCheckInsDto,
    ) {
        const checkIns = await this.habitsService.getCheckIns(userId, id, query.days);
        return {
            message: 'Check-ins fetched successfully',
            data: checkIns,
        }
    }

    /** Restore */
    @Patch(':id/restore')
    restore(
        @CurrentUser('userId') userId: number,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.habitsService.restore(userId, id);
    }

    /** Permanently delete */
    @Delete(':id')
    permanentlyDelete(
        @CurrentUser('userId') userId: number,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.habitsService.permanentlyDelete(userId, id);
    }
}
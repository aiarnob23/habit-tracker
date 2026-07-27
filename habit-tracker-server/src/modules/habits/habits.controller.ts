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

    /** Create */
    @Post()
    async create(@CurrentUser('userId') userId: number, @Body() dto: CreateHabitDto) {
        const res = await this.habitsService.create(userId, dto);
        return {
            message: 'Habit created successfully',
            data: res,
        }
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
    async update(
        @CurrentUser('userId') userId: number,
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateHabitDto,
    ) {
        const habit = await this.habitsService.update(userId, id, dto);
        return {
            message: 'Habit updated successfully',
            data: habit,
        }
    }

    /**  Archive */
    @Patch(':id/archive')
    async archive(
        @CurrentUser('userId') userId: number,
        @Param('id', ParseIntPipe) id: number,
    ) {
        const habit = await this.habitsService.archive(userId, id);
        return {
            message: 'Habit archived successfully',
            data: habit,
        }
    }
    /** Mark today done */
    @Put(':id/checkins/today')
    async completeToday(
        @CurrentUser('userId') userId: number,
        @Param('id', ParseIntPipe) id: number,
    ) {
        const checkIn = await this.habitsService.markTodayDone(userId, id);
        return {
            message: 'Habit marked for today successfully',
            data: checkIn,
        }
    }

    /** Unmark today */
    @Delete(':id/checkins/today')
    async removeTodayCompletion(
        @CurrentUser('userId') userId: number,
        @Param('id', ParseIntPipe) id: number,
    ) {
        const checkIn = await this.habitsService.unmarkToday(userId, id);
        return {
            message: 'Habit marked for today removed successfully',
            data: checkIn,
        }
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
    async restore(
        @CurrentUser('userId') userId: number,
        @Param('id', ParseIntPipe) id: number,
    ) {
        const habit = await this.habitsService.restore(userId, id);
        return {
            message: 'Habit restored successfully',
            data: habit,
        }
    }

    /** Permanently delete */
    @Delete(':id')
    async permanentlyDelete(
        @CurrentUser('userId') userId: number,
        @Param('id', ParseIntPipe) id: number,
    ) {
        const res = await this.habitsService.permanentlyDelete(userId, id);
        return {
            message: 'Habit permanently deleted successfully',
            data: res.id,
        }
    }
}
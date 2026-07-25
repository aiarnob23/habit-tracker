import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { HABIT_REPOSITORY, IHabitRepository } from './interfaces/habit-repository.interface';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { computeStreaks } from './utils/streak.util';
import { daysAgoUTC, todayUTC, toDateKey } from './utils/date.util';
import { HabitDetail, HabitListItem } from './types/habit-response.types';

@Injectable()
export class HabitsService {
    constructor(
        @Inject(HABIT_REPOSITORY) private readonly habitRepo: IHabitRepository,
    ) { }

    //create new habit
    create(userId: number, dto: CreateHabitDto) {
        return this.habitRepo.create({
            title: dto.title,
            description: dto.description,
            color: dto.color,
            user: { connect: { id: userId } },
        });
    }

    //find all by user
    async findAllForUser(userId: number): Promise<HabitListItem[]> {
        const cutoff = daysAgoUTC(400);
        const habits = await this.habitRepo.findManyByUserWithRecentCheckIns(
            userId,
            'ACTIVE',
            cutoff,
        );

        const today = toDateKey(todayUTC());

        return habits.map((habit) => {
            const dates = habit.habitCheckIns.map((c) => c.date);
            const { currentStreak } = computeStreaks(dates);
            const todayCompleted = dates.some((d) => toDateKey(d) === today);

            return {
                id: habit.id,
                title: habit.title,
                description: habit.description,
                color: habit.color,
                status: habit.status,
                todayCompleted,
                currentStreak,
            };
        });
    }

    //find one by habit id
    async findOneForUser(
        userId: number,
        habitId: number,
        days = 90,
    ): Promise<HabitDetail> {
        const habit = await this.getOwnedHabitOrThrow(userId, habitId);
        const allCheckIns = await this.habitRepo.findCheckInsByHabit(habitId);
        const allDates = allCheckIns.map((c) => c.date);

        const { currentStreak, longestStreak } = computeStreaks(allDates);

        const cutoff = daysAgoUTC(days);
        const heatmapDates = allDates
            .filter((d) => d >= cutoff)
            .map((d) => toDateKey(d));

        return {
            id: habit.id,
            title: habit.title,
            description: habit.description,
            color: habit.color,
            status: habit.status,
            createdAt: habit.createdAt,
            currentStreak,
            longestStreak,
            checkIns: heatmapDates,
        };
    }

    //update
    async update(userId: number, habitId: number, dto: UpdateHabitDto) {
        await this.getOwnedHabitOrThrow(userId, habitId);

        return this.habitRepo.update(habitId, {
            title: dto.title,
            description: dto.description,
            color: dto.color,
            status: dto.status,
            archivedAt: dto.status === 'ARCHIVED' ? new Date() : undefined,
        });
    }

    //archive
    async archive(userId: number, habitId: number) {
        await this.getOwnedHabitOrThrow(userId, habitId);
        return this.habitRepo.update(habitId, {
            status: 'ARCHIVED',
            archivedAt: new Date(),
        });
    }

    //mark today done
    async markTodayDone(userId: number, habitId: number) {
        await this.getOwnedHabitOrThrow(userId, habitId);
        const today = todayUTC();

        const existing = await this.habitRepo.findCheckInByDate(habitId, today);
        if (existing) return existing;

        return this.habitRepo.createCheckIn(habitId, today);
    }

    //unmark today
    async unmarkToday(userId: number, habitId: number) {
        await this.getOwnedHabitOrThrow(userId, habitId);
        await this.habitRepo.deleteCheckInByDate(habitId, todayUTC());
        return { success: true };
    }

    //get check-ins
    async getCheckIns(userId: number, habitId: number, days = 90) {
        await this.getOwnedHabitOrThrow(userId, habitId);
        const cutoff = daysAgoUTC(days);
        const checkIns = await this.habitRepo.findCheckInsByHabit(habitId, cutoff);
        return checkIns.map((c) => toDateKey(c.date));
    }

    // PRIVATE
    private async getOwnedHabitOrThrow(userId: number, habitId: number) {
        const habit = await this.habitRepo.findById(habitId);
        if (!habit) throw new NotFoundException('Habit not found');
        if (habit.userId !== userId) throw new NotFoundException('Habit not found');
        return habit;
    }
}
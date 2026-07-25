import { Habit, HabitCheckIn, HabitStatus, Prisma } from "generated/prisma/client";


export const HABIT_REPOSITORY = Symbol('HABIT_REPOSITORY');

export interface IHabitRepository {
    create(data: Prisma.HabitCreateInput): Promise<Habit>;
    findById(id: number): Promise<Habit | null>;
    findManyByUser(userId: number, status?: HabitStatus): Promise<Habit[]>;
    update(id: number, data: Prisma.HabitUpdateInput): Promise<Habit>;
    // check-ins
    findCheckInsByHabit(
        habitId: number,
        fromDate?: Date,
    ): Promise<HabitCheckIn[]>;
    findCheckInByDate(habitId: number, date: Date): Promise<HabitCheckIn | null>;
    createCheckIn(habitId: number, date: Date): Promise<HabitCheckIn>;
    deleteCheckInByDate(habitId: number, date: Date): Promise<void>;
    findManyByUserWithRecentCheckIns(
        userId: number,
        status: HabitStatus,
        checkInsFrom: Date,
    ): Promise<(Habit & { habitCheckIns: HabitCheckIn[] })[]>;
}
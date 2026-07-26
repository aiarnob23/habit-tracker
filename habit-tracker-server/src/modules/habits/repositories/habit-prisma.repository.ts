import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { HabitStatus, Prisma } from '../../../../generated/prisma/client';
import { IHabitRepository } from '../interfaces/habit-repository.interface';

@Injectable()
export class PrismaHabitRepository implements IHabitRepository {
  constructor(private readonly prisma: PrismaService) { }

  create(data: Prisma.HabitCreateInput) {
    return this.prisma.habit.create({ data });
  }

  findById(id: number) {
    return this.prisma.habit.findUnique({ where: { id } });
  }

  findManyByUser(userId: number, status?: HabitStatus) {
    return this.prisma.habit.findMany({
      where: {
        userId,
        ...(status && { status }),
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  update(id: number, data: Prisma.HabitUpdateInput) {
    return this.prisma.habit.update({ where: { id }, data });
  }

  findCheckInsByHabit(habitId: number, fromDate?: Date) {
    return this.prisma.habitCheckIn.findMany({
      where: { habitId, ...(fromDate ? { date: { gte: fromDate } } : {}) },
      orderBy: { date: 'asc' },
    });
  }

  findCheckInByDate(habitId: number, date: Date) {
    return this.prisma.habitCheckIn.findFirst({ where: { habitId, date } });
  }

  findArchivedByUser(userId: number) {
    return this.prisma.habit.findMany({
      where: {
        userId,
        status: "ARCHIVED",
      },
      orderBy: {
        archivedAt: "desc",
      },
    });
  }

  delete(id: number) {
    return this.prisma.habit.delete({
      where: { id },
    });
  }

  createCheckIn(habitId: number, date: Date) {
    return this.prisma.habitCheckIn.create({ data: { habitId, date } });
  }

  async deleteCheckInByDate(habitId: number, date: Date) {
    await this.prisma.habitCheckIn.deleteMany({ where: { habitId, date } });
  }

  findManyByUserWithRecentCheckIns(
    userId: number,
    status: HabitStatus,
    checkInsFrom: Date,
  ) {
    return this.prisma.habit.findMany({
      where: { userId, status },
      orderBy: { createdAt: 'desc' },
      include: {
        habitCheckIns: {
          where: { date: { gte: checkInsFrom } },
        },
      },
    });
  }
}
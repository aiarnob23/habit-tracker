import { Module } from '@nestjs/common';
import { HabitsController } from './habits.controller';
import { HabitsService } from './habits.service';
import { PrismaModule } from '../../infrastructure/database/prisma/prisma.module';
import { HABIT_REPOSITORY } from './interfaces/habit-repository.interface';
import { PrismaHabitRepository } from './repositories/habit-prisma.repository';

@Module({
  imports: [PrismaModule],
  controllers: [HabitsController],
  providers: [
    HabitsService,
    { provide: HABIT_REPOSITORY, useClass: PrismaHabitRepository },
  ],
  exports: [HabitsService],
})
export class HabitsModule {}
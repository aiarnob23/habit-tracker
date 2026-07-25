import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './database/prisma/prisma.module';
import { RedisModule } from './core/redis/redis.module';
import { BullMQModule } from './core/queues/bullmq.module';
import { RateLimitModule } from './core/rate-limit/module/ rate-limit.module';
import { AppLoggerModule } from './core/logging/logger.module';
import { RequestContextModule } from './core/context/request/request-context.module';
import { SessionsModule } from './modules/sessions/sessions.module';
import { APP_GUARD } from '@nestjs/core';
import { RateLimitGuard } from './core/rate-limit/guards/rate-limit.guard';
import { AppService } from './app.service';
import { HabitsModule } from './modules/habits/habits.module';
import { JwtAuthGuard } from './core/guards/jwt-auth.guard';

@Module({
  imports: [
    RedisModule,
    BullMQModule,
    RateLimitModule,
    AppLoggerModule,
    PrismaModule,
    RequestContextModule,
    UsersModule,
    AuthModule,
    SessionsModule,
    HabitsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RateLimitGuard },
  ],
})
export class AppModule { }

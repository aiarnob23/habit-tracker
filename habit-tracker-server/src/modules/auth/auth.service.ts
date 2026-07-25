import { Inject, Injectable } from "@nestjs/common";
import Redis from "ioredis";
import { AppLogger } from "src/core/logging/logger.service";
import { REDIS_CLIENT } from "src/core/redis/redis.constant";
import { EncryptionService } from "src/core/security/encryption/encryption.service";
import { TokenService } from "./token.service";


@Injectable()
export class AuthService {
    constructor(
        @Inject(REDIS_CLIENT) private readonly redis: Redis,
        private readonly logger: AppLogger,
        private readonly usersService: UsersService,
        private readonly encryptionService: EncryptionService,
        private readonly tokenService: TokenService,
        private readonly sessionService: SessionService,
        private readonly notificationService: NotificationsService,
    ) { }
}
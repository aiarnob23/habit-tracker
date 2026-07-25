import { Injectable } from "@nestjs/common";
import { CreateUserInput, IUserRepository } from "../interfaces/user-repository.interface";
import { PrismaService } from "src/infrastructure/database/prisma/prisma.service";
import { User } from "generated/prisma/client";


@Injectable()
export class PrismaUserRepository implements IUserRepository {
    constructor(private readonly prisma: PrismaService) { }
    // create user
    create(data: CreateUserInput): Promise<User> {
        return this.prisma.user.create({
            data
        });
    }
    // find user by email
    findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: {
                email
            }
        });
    }
    // find self profile by id
    getSelfProfileById(id: number) {
        return this.prisma.user.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                avatarUrl: true,
            }
        });
    }
    // find user by id
    getUserById(id: number) {
        return this.prisma.user.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                avatarUrl: true,
            }
        })
    }

    //update user details
    updateUser(id: number, data: any) {
        // return this.prisma.user.update({
        //     where: {
        //         id
        //     },
        //     data: {
        //         
        //     }
        // })
    }
}
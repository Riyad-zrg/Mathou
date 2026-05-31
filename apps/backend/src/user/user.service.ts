import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import { User,Prisma } from "../generated/prisma/browser.js";
import bcrypt from "bcrypt";

@Injectable()
export class UserService{
    constructor(
        private prisma: PrismaService, 
    ) {}

    async findUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null>{
        return this.prisma.user.findUnique({
            where: userWhereUniqueInput,
        })
    }

    async findAll(){
        return this.prisma.user.findMany();
    }

    async findUsers(params:{
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput
        where?: Prisma.UserWhereInput
        orderBy?: Prisma.UserOrderByWithRelationInput;
    }): Promise<User[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.user.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
        });
    }

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        const myPlaintextPassword = data.password;
        data.password = this.hashPassword(myPlaintextPassword);

        return this.prisma.user.create({
            data
        });
    };

    async updateUser(params : {data: Prisma.UserUpdateInput, where: Prisma.UserWhereUniqueInput}): Promise<User> {
        const {where, data} = params
        return this.prisma.user.update({
            data,
            where,
        });
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User>{
        return this.prisma.user.delete({
            where,
        });
    }

    public hashPassword(plainTextPassword: string): string{
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(plainTextPassword, salt);
        return hash;
    }
}
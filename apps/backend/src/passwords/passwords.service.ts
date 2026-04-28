import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service.js";
import { PasswordResetManagement,Prisma } from "../generated/prisma/browser.js";
import { UserService } from '../user/user.service.js';

@Injectable()
export class PasswordsService {
    constructor(
        private userService:UserService,
        private prisma: PrismaService, 
    ){}

    async passwordResetCheckEmail(email:string){
        const user = await this.userService.findUser({email:email});
        
        if(!user){
            throw new NotFoundException('Aucun compte avec cette adresse e-mail n\'a été trouvé');
        }

        const crypto = require('crypto');
        const hash = crypto.createHash('sha256');

        console.log(hash);

    }
    
    async verifyPasswordReset(token : string){
        
    }

    async findOne(params:{
            skip?: number;
            take?: number;
            cursor?: Prisma.PasswordResetManagementWhereUniqueInput
            where?: Prisma.PasswordResetManagementWhereInput
            orderBy?: Prisma.PasswordResetManagementOrderByWithRelationInput;
        }): Promise<PasswordResetManagement[]> {
            const { skip, take, cursor, where, orderBy } = params;
            return this.prisma.passwordResetManagement.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            });
        }

    async create(data: Prisma.PasswordResetManagementCreateInput): Promise<PasswordResetManagement> {
            return this.prisma.passwordResetManagement.create({
                data
            });
        };
    
    async update(params : {data: Prisma.PasswordResetManagementUpdateInput, where: Prisma.PasswordResetManagementWhereUniqueInput}): Promise<PasswordResetManagement> {
        const {where, data} = params
        return this.prisma.passwordResetManagement.update({
            data,
            where,
        });
    }
}

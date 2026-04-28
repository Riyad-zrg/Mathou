import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service.js";
import { PasswordResetManagement,Prisma } from "../generated/prisma/browser.js";
import { UserService } from '../user/user.service.js';
import { createCipheriv, randomBytes, scrypt } from 'node:crypto';
import { promisify } from 'node:util';
import crypto from 'crypto';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_KEY);

@Injectable()
export class PasswordsService {
    constructor(
        private userService:UserService,
        private prisma: PrismaService, 
    ){}

    async passwordResetCheckEmail(email:string) : Promise<{message: string}>{
        const user = await this.userService.findUser({email:email});
        
        if(!user){
            throw new NotFoundException('Aucun compte avec cette adresse e-mail n\'a été trouvé');
        }

        const iv = randomBytes(16);

        const password = process.env.RESET_TOKEN_PASSWORD;

        if(!password){
            throw new NotFoundException('Erreur environnement serveur.')
        }

        const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;

        const cipher = createCipheriv('aes-256-ctr', key, iv);

        const token = randomBytes(16).toString('hex');
        const encryptedToken = Buffer.concat([
            cipher.update(token),
            cipher.final(),
        ]);
        
        const expiresDate = new Date();
        expiresDate.setMinutes(expiresDate.getMinutes() + 15);

        await this.create(
            {
                token: encryptedToken.toString(), 
                expiresDate:expiresDate, 
                user:{connect : {id: user.id}}
            }
        )

        await resend.emails.send({
            from: 'Socatoa <noreply@contact.socatoa.eu>',
            to: email,
            subject: 'Confirmation d\'adresse e-mail',
            text: `Voici le lien pour vérifier votre adresse e-mail : http://localhost:3000/signup/verify?verification_token=${token}`,
        })

        return {message: 'Le courriel de réinitialisation de mot de passe a été envoyé'}
    }
    
    async verifyPasswordReset(token : string){
        console.log(crypto.randomBytes(10))
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
                data,
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

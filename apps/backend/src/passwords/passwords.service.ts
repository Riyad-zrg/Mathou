import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  PasswordResetManagement,
  Prisma,
} from '../generated/prisma/browser.js';
import { UserService } from '../user/user.service.js';
import { randomBytes } from 'node:crypto';
import { Resend } from 'resend';
import bcrypt from 'bcrypt';

const resend = new Resend(process.env.RESEND_KEY);

@Injectable()
export class PasswordsService {
  constructor(
    private userService: UserService,
    private prisma: PrismaService,
  ) {}

  async passwordResetCheckEmail(email: string): Promise<{ message: string }> {
    email = email.toLowerCase();

    const user = await this.userService.findUser({ email: email });

    if (!user) {
      throw new NotFoundException(
        "Aucun compte avec cette adresse e-mail n'a été trouvé",
      );
    }

    const resetToken = randomBytes(16).toString('hex');

    const hash = this.hashToken(resetToken);

    const expiresDate = new Date();
    expiresDate.setMinutes(expiresDate.getMinutes() + 15);

    const resetObj = await this.upsert({
      where: { userId: user.id },
      update: { token: hash, expiresDate: expiresDate, hasBeenUsed: false },
      create: {
        token: hash,
        expiresDate: expiresDate,
        user: { connect: { id: user.id } },
      },
    });

    await resend.emails.send({
      from: 'Socatoa <noreply@contact.socatoa.eu>',
      to: email,
      subject: 'Réinitialisation de mot de passe',
      text: `Voici le lien pour réinitialiser votre mot de passe : ${process.env.NEXT_PUBLIC_CLIENT_URL}/password-reset/choose-password?reset_token=${resetToken}&reset_id=${resetObj.id}`,
    });

    return {
      message: 'Le courriel de réinitialisation de mot de passe a été envoyé',
    };
  }

  async udpatePassword(
    token: string,
    resetId: string,
    password: string,
    confirmPassword: string,
  ) {
    if (password !== confirmPassword) {
      throw new BadRequestException('Les mots de passe ne correspondent pas.');
    }

    const passwordResetObj = await this.findOne({ id: +resetId });

    if (!passwordResetObj) {
      throw new UnauthorizedException('Le lien est invalide.');
    }

    const match = await bcrypt.compare(token, passwordResetObj.token);

    if (!match) {
      throw new UnauthorizedException(
        'Les informations du lien sont incorrects.',
      );
    }

    if (passwordResetObj.hasBeenUsed) {
      throw new UnauthorizedException("Le lien n'est plus valide.");
    }

    if (passwordResetObj.expiresDate < new Date()) {
      throw new UnauthorizedException('Le lien a expiré.');
    }

    await this.update({
      data: { hasBeenUsed: true },
      where: { id: passwordResetObj.id },
    });

    const user = await this.userService.findUser({
      id: passwordResetObj?.userId,
    });

    if (!user) {
      throw new NotFoundException(
        "Aucun utilisateur avec cette adresse e-mail n'a été trouvé.",
      );
    }

    password = this.userService.hashPassword(password);

    await this.userService.updateUser({
      data: { password: password },
      where: { email: user.email },
    });

    return { message: 'Le mot de passe à bien été enregistré.' };
  }

  async findOne(
    passwordResetManagementWhereUniqueInput: Prisma.PasswordResetManagementWhereUniqueInput,
  ): Promise<PasswordResetManagement | null> {
    return this.prisma.passwordResetManagement.findUnique({
      where: passwordResetManagementWhereUniqueInput,
    });
  }

  async upsert(params: {
    where: Prisma.PasswordResetManagementWhereUniqueInput;
    update: Prisma.PasswordResetManagementUpdateInput;
    create: Prisma.PasswordResetManagementCreateInput;
  }): Promise<PasswordResetManagement> {
    const { where, update, create } = params;
    return this.prisma.passwordResetManagement.upsert({
      where,
      update,
      create,
    });
  }

  async update(params: {
    data: Prisma.PasswordResetManagementUpdateInput;
    where: Prisma.PasswordResetManagementWhereUniqueInput;
  }) {
    const { data, where } = params;
    return this.prisma.passwordResetManagement.update({
      data,
      where,
    });
  }

  public hashToken(token: string): string {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(token, salt);
    return hash;
  }
}

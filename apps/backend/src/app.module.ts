import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';
import { LoggerMiddleware } from './middleware/logger.middleware.js';
import { UserModule } from './user/user.module.js';
import { MailerModule } from '@nestjs-modules/mailer';
import { PasswordsModule } from './passwords/passwords.module.js';

@Module({
  imports: [ConfigModule.forRoot({envFilePath: '.env', isGlobal: true}), 
    PrismaModule, 
    AuthModule, 
    UserModule,
    MailerModule.forRoot({
      transport: {
        host: process.env.MAILER_HOST,
        port: process.env.MAILER_PORT,
        secure: false,
        auth: {
          user: process.env.MAILER_USERNAME,
          pass: process.env.MAILER_PASSWORD,
        },
      },
    }),
    PasswordsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { EtudiantModule } from './resources/etudiant/etudiant.module';
import { CoursModule } from './resources/cours/cours.module';
import { UsersModule } from './resources/users/users.module';
import { MailModule } from './mail/mail.module';


@Module({
  imports: [EtudiantModule, CoursModule, UsersModule, MailModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
 
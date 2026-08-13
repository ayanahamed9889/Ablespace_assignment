import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SessionGuard } from './guards/session.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService, SessionGuard],
  controllers: [AuthController],
  exports: [AuthService, SessionGuard],
})
export class AuthModule {}

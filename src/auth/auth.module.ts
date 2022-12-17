import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ATStrategy } from './strategies/AT.strategy';
import { ATGuard } from './guards/AT.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, ATStrategy, ATGuard],
  exports: [ATStrategy, ATGuard]
})
export class AuthModule {}

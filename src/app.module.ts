import { Module } from '@nestjs/common';
import { MessangerModule } from './messanger/messanger.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MessangerModule, AuthModule],
})
export class AppModule {}

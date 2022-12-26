import { Module } from '@nestjs/common';
import { MessangerService } from './messanger.service';
import { MessangerGateway } from './messanger.gateway';
import { ATGuard } from '../auth/guards/AT.guard';

@Module({
  providers: [MessangerGateway, MessangerService, ATGuard]
})
export class MessangerModule {}

import { Module } from '@nestjs/common';
import { MessangerModule } from './messanger/messanger.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'mess_db',
      username: 'mess',
      password: 'mess',
      entities: [__dirname + '/**/*.entity{.ts}'],
      autoLoadEntities: true,
      synchronize: true
    }),
    MessangerModule,
    AuthModule
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';

import { CreateAccountController } from './controllers/create-account.controller';
import { DatabaseModule } from '../database/database.module';
import { RegisterUserUseCase } from '@/domain/use-cases/create-user';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateAccountController],
  providers: [RegisterUserUseCase],
})
export class HttpModule {}

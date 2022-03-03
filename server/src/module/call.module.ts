import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CallController } from '../web/rest/call.controller';
import { CallRepository } from '../repository/call.repository';
import { CallService } from '../service/call.service';

@Module({
    imports: [TypeOrmModule.forFeature([CallRepository])],
    controllers: [CallController],
    providers: [CallService],
    exports: [CallService],
})
export class CallModule {}

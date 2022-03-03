import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProspectStageHistoryController } from '../web/rest/prospect-stage-history.controller';
import { ProspectStageHistoryRepository } from '../repository/prospect-stage-history.repository';
import { ProspectStageHistoryService } from '../service/prospect-stage-history.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProspectStageHistoryRepository])],
    controllers: [ProspectStageHistoryController],
    providers: [ProspectStageHistoryService],
    exports: [ProspectStageHistoryService],
})
export class ProspectStageHistoryModule {}

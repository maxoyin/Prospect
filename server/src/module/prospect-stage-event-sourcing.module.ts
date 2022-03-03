import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProspectStageEventSourcingController } from '../web/rest/prospect-stage-event-sourcing.controller';
import { ProspectStageEventSourcingRepository } from '../repository/prospect-stage-event-sourcing.repository';
import { ProspectStageEventSourcingService } from '../service/prospect-stage-event-sourcing.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProspectStageEventSourcingRepository])],
    controllers: [ProspectStageEventSourcingController],
    providers: [ProspectStageEventSourcingService],
    exports: [ProspectStageEventSourcingService],
})
export class ProspectStageEventSourcingModule {}

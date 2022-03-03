import { EntityRepository, Repository } from 'typeorm';
import { ProspectStageEventSourcingEntity } from '../domain/prospect-stage-event-sourcing.entity';

@EntityRepository(ProspectStageEventSourcingEntity)
export class ProspectStageEventSourcingRepository extends Repository<ProspectStageEventSourcingEntity> {}

import { EntityRepository, Repository } from 'typeorm';
import { ProspectStageHistoryEntity } from '../domain/prospect-stage-history.entity';

@EntityRepository(ProspectStageHistoryEntity)
export class ProspectStageHistoryRepository extends Repository<ProspectStageHistoryEntity> {}

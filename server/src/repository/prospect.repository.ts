import { EntityRepository, Repository } from 'typeorm';
import { ProspectEntity } from '../domain/prospect.entity';

@EntityRepository(ProspectEntity)
export class ProspectRepository extends Repository<ProspectEntity> {}

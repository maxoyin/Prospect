import { EntityRepository, Repository } from 'typeorm';
import { AgentEntity } from '../domain/agent.entity';

@EntityRepository(AgentEntity)
export class AgentRepository extends Repository<AgentEntity> {}

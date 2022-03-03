import { EntityRepository, Repository } from 'typeorm';
import { CallEntity } from '../domain/call.entity';

@EntityRepository(CallEntity)
export class CallRepository extends Repository<CallEntity> {}

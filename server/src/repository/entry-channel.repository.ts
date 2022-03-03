import { EntityRepository, Repository } from 'typeorm';
import { EntryChannelEntity } from '../domain/entry-channel.entity';

@EntityRepository(EntryChannelEntity)
export class EntryChannelRepository extends Repository<EntryChannelEntity> {}

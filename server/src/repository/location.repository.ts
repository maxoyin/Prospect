import { EntityRepository, Repository } from 'typeorm';
import { LocationEntity } from '../domain/location.entity';

@EntityRepository(LocationEntity)
export class LocationRepository extends Repository<LocationEntity> {}

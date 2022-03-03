import { EntityRepository, Repository } from 'typeorm';
import { AddressEntity } from '../domain/address.entity';

@EntityRepository(AddressEntity)
export class AddressRepository extends Repository<AddressEntity> {}

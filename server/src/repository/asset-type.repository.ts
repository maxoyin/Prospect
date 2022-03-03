import { EntityRepository, Repository } from 'typeorm';
import { AssetTypeEntity } from '../domain/asset-type.entity';

@EntityRepository(AssetTypeEntity)
export class AssetTypeRepository extends Repository<AssetTypeEntity> {}

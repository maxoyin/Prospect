import { AssetTypeEntity } from '../../domain/asset-type.entity';
import { AssetTypeDTO } from '../dto/asset-type.dto';

/**
 * A AssetType mapper object.
 */
export class AssetTypeMapper {
    static fromDTOtoEntity(entityDTO: AssetTypeDTO): AssetTypeEntity {
        if (!entityDTO) {
            return;
        }
        const entity = new AssetTypeEntity();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: AssetTypeEntity): AssetTypeDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new AssetTypeDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}

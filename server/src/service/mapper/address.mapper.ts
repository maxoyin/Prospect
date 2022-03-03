import { AddressEntity } from '../../domain/address.entity';
import { AddressDTO } from '../dto/address.dto';

/**
 * A Address mapper object.
 */
export class AddressMapper {
    static fromDTOtoEntity(entityDTO: AddressDTO): AddressEntity {
        if (!entityDTO) {
            return;
        }
        const entity = new AddressEntity();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: AddressEntity): AddressDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new AddressDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}

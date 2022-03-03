import { CallEntity } from '../../domain/call.entity';
import { CallDTO } from '../dto/call.dto';

/**
 * A Call mapper object.
 */
export class CallMapper {
    static fromDTOtoEntity(entityDTO: CallDTO): CallEntity {
        if (!entityDTO) {
            return;
        }
        const entity = new CallEntity();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: CallEntity): CallDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new CallDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}

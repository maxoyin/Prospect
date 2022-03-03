import { ProspectEntity } from '../../domain/prospect.entity';
import { ProspectDTO } from '../dto/prospect.dto';

/**
 * A Prospect mapper object.
 */
export class ProspectMapper {
    static fromDTOtoEntity(entityDTO: ProspectDTO): ProspectEntity {
        if (!entityDTO) {
            return;
        }
        const entity = new ProspectEntity();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: ProspectEntity): ProspectDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new ProspectDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}

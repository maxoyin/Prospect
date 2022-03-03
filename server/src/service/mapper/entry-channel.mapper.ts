import { EntryChannelEntity } from '../../domain/entry-channel.entity';
import { EntryChannelDTO } from '../dto/entry-channel.dto';

/**
 * A EntryChannel mapper object.
 */
export class EntryChannelMapper {
    static fromDTOtoEntity(entityDTO: EntryChannelDTO): EntryChannelEntity {
        if (!entityDTO) {
            return;
        }
        const entity = new EntryChannelEntity();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: EntryChannelEntity): EntryChannelDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new EntryChannelDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}

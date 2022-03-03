import { ProspectStageEventSourcingEntity } from '../../domain/prospect-stage-event-sourcing.entity';
import { ProspectStageEventSourcingDTO } from '../dto/prospect-stage-event-sourcing.dto';

/**
 * A ProspectStageEventSourcing mapper object.
 */
export class ProspectStageEventSourcingMapper {
    static fromDTOtoEntity(entityDTO: ProspectStageEventSourcingDTO): ProspectStageEventSourcingEntity {
        if (!entityDTO) {
            return;
        }
        const entity = new ProspectStageEventSourcingEntity();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: ProspectStageEventSourcingEntity): ProspectStageEventSourcingDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new ProspectStageEventSourcingDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}

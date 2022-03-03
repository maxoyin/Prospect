import { ProspectStageHistoryEntity } from '../../domain/prospect-stage-history.entity';
import { ProspectStageHistoryDTO } from '../dto/prospect-stage-history.dto';

/**
 * A ProspectStageHistory mapper object.
 */
export class ProspectStageHistoryMapper {
    static fromDTOtoEntity(entityDTO: ProspectStageHistoryDTO): ProspectStageHistoryEntity {
        if (!entityDTO) {
            return;
        }
        const entity = new ProspectStageHistoryEntity();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: ProspectStageHistoryEntity): ProspectStageHistoryDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new ProspectStageHistoryDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}

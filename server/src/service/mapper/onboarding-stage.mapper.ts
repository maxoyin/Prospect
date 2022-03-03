import { OnboardingStageEntity } from '../../domain/onboarding-stage.entity';
import { OnboardingStageDTO } from '../dto/onboarding-stage.dto';

/**
 * A OnboardingStage mapper object.
 */
export class OnboardingStageMapper {
    static fromDTOtoEntity(entityDTO: OnboardingStageDTO): OnboardingStageEntity {
        if (!entityDTO) {
            return;
        }
        const entity = new OnboardingStageEntity();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: OnboardingStageEntity): OnboardingStageDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new OnboardingStageDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}

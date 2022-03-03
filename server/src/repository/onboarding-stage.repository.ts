import { EntityRepository, Repository } from 'typeorm';
import { OnboardingStageEntity } from '../domain/onboarding-stage.entity';

@EntityRepository(OnboardingStageEntity)
export class OnboardingStageRepository extends Repository<OnboardingStageEntity> {}

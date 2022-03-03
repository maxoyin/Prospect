import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OnboardingStageController } from '../web/rest/onboarding-stage.controller';
import { OnboardingStageRepository } from '../repository/onboarding-stage.repository';
import { OnboardingStageService } from '../service/onboarding-stage.service';

@Module({
    imports: [TypeOrmModule.forFeature([OnboardingStageRepository])],
    controllers: [OnboardingStageController],
    providers: [OnboardingStageService],
    exports: [OnboardingStageService],
})
export class OnboardingStageModule {}

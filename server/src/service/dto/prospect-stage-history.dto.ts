/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { OnboardingStageDTO } from './onboarding-stage.dto';
import { ProspectDTO } from './prospect.dto';

/**
 * A ProspectStageHistoryDTO object.
 */
export class ProspectStageHistoryDTO extends BaseDTO {
    @ApiModelProperty({ description: 'name field', required: false })
    name: string;

    @ApiModelProperty({ description: 'createdAt field', required: false })
    createdAt: any;

    @ApiModelProperty({ type: OnboardingStageDTO, description: 'fromStage relationship' })
    fromStage: OnboardingStageDTO;

    @ApiModelProperty({ type: OnboardingStageDTO, description: 'toStage relationship' })
    toStage: OnboardingStageDTO;

    @ApiModelProperty({ type: ProspectDTO, description: 'prospect relationship' })
    prospect: ProspectDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

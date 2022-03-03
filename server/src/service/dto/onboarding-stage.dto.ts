/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

/**
 * A OnboardingStageDTO object.
 */
export class OnboardingStageDTO extends BaseDTO {
    @ApiModelProperty({ description: 'name field', required: false })
    name: string;

    @ApiModelProperty({ description: 'description field', required: false })
    description: string;

    @ApiModelProperty({ description: 'rank field', required: false })
    rank: number;

    @ApiModelProperty({ description: 'createdAt field', required: false })
    createdAt: any;

    @ApiModelProperty({ description: 'updatedAt field', required: false })
    updatedAt: any;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

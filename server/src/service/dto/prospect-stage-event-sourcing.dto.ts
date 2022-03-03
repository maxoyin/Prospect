/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

/**
 * A ProspectStageEventSourcingDTO object.
 */
export class ProspectStageEventSourcingDTO extends BaseDTO {
    @ApiModelProperty({ description: 'createdAt field', required: false })
    createdAt: any;

    @ApiModelProperty({ description: 'propsectId field', required: false })
    propsectId: string;

    @ApiModelProperty({ description: 'event field', required: false })
    event: string;

    @ApiModelProperty({ description: 'payload field', required: false })
    payload: string;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

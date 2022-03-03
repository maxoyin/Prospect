/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { AgentDTO } from './agent.dto';
import { ProspectDTO } from './prospect.dto';

/**
 * A CallDTO object.
 */
export class CallDTO extends BaseDTO {
    @ApiModelProperty({ description: 'comment field', required: false })
    comment: string;

    @ApiModelProperty({ description: 'createdAt field', required: false })
    createdAt: any;

    @ApiModelProperty({ type: AgentDTO, description: 'agent relationship' })
    agent: AgentDTO;

    @ApiModelProperty({ type: ProspectDTO, description: 'prospect relationship' })
    prospect: ProspectDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

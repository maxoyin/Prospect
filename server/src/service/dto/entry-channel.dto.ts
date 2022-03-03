/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

/**
 * A EntryChannelDTO object.
 */
export class EntryChannelDTO extends BaseDTO {
    @ApiModelProperty({ description: 'name field', required: false })
    name: string;

    @ApiModelProperty({ description: 'description field', required: false })
    description: string;

    @ApiModelProperty({ description: 'createdAt field', required: false })
    createdAt: any;

    @ApiModelProperty({ description: 'updatedAt field', required: false })
    updatedAt: any;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { ProspectDTO } from './prospect.dto';

/**
 * A AssetTypeDTO object.
 */
export class AssetTypeDTO extends BaseDTO {
    @ApiModelProperty({ description: 'name field', required: false })
    name: string;

    @ApiModelProperty({ description: 'description field', required: false })
    description: string;

    @ApiModelProperty({ description: 'createdAt field', required: false })
    createdAt: any;

    @ApiModelProperty({ description: 'updatedAt field', required: false })
    updatedAt: any;

    @ApiModelProperty({ type: ProspectDTO, isArray: true, description: 'prospects relationship' })
    prospects: ProspectDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

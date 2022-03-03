/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

/**
 * A AddressDTO object.
 */
export class AddressDTO extends BaseDTO {
    @ApiModelProperty({ description: 'number field', required: false })
    number: string;

    @ApiModelProperty({ description: 'street field', required: false })
    street: string;

    @ApiModelProperty({ description: 'city field', required: false })
    city: string;

    @ApiModelProperty({ description: 'state field', required: false })
    state: string;

    @ApiModelProperty({ description: 'countryName field', required: false })
    countryName: string;

    @ApiModelProperty({ description: 'countryCode field', required: false })
    countryCode: string;

    @ApiModelProperty({ description: 'createdAt field', required: false })
    createdAt: any;

    @ApiModelProperty({ description: 'updatedAt field', required: false })
    updatedAt: any;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

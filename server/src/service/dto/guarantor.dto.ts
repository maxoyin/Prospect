/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { AddressDTO } from './address.dto';
import { Gender } from '../../domain/enumeration/gender';

/**
 * A GuarantorDTO object.
 */
export class GuarantorDTO extends BaseDTO {
    @ApiModelProperty({ description: 'lastName field', required: false })
    lastName: string;

    @ApiModelProperty({ description: 'firstName field', required: false })
    firstName: string;

    @ApiModelProperty({ description: 'otherNames field', required: false })
    otherNames: string;

    @ApiModelProperty({ enum: Gender, description: 'gender enum field', required: false })
    gender: Gender;

    @ApiModelProperty({ description: 'email field', required: false })
    email: string;

    @ApiModelProperty({ description: 'phone field', required: false })
    phone: string;

    @ApiModelProperty({ description: 'alternatePhone field', required: false })
    alternatePhone: string;

    @ApiModelProperty({ description: 'bvn field', required: false })
    bvn: string;

    @ApiModelProperty({ description: 'createdAt field', required: false })
    createdAt: any;

    @ApiModelProperty({ description: 'updatedAt field', required: false })
    updatedAt: any;

    @ApiModelProperty({ type: AddressDTO, description: 'adress relationship' })
    adress: AddressDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

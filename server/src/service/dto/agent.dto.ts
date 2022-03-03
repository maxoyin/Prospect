/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { AddressDTO } from './address.dto';
import { CallDTO } from './call.dto';

/**
 * A AgentDTO object.
 */
export class AgentDTO extends BaseDTO {
    @IsNotEmpty()
    @ApiModelProperty({ description: 'role field' })
    role: string;

    @ApiModelProperty({ description: 'lastName field', required: false })
    lastName: string;

    @ApiModelProperty({ description: 'firstName field', required: false })
    firstName: string;

    @ApiModelProperty({ description: 'code field', required: false })
    code: string;

    @ApiModelProperty({ description: 'status field', required: false })
    status: string;

    @ApiModelProperty({ description: 'dateEnrolled field', required: false })
    dateEnrolled: any;

    /**
     * Getter property
     */
    @ApiModelProperty({ description: 'Getter property', required: false })
    registeredProspects: number;

    /**
     * Getter property
     */
    @ApiModelProperty({ description: 'Getter property', required: false })
    activatedProspects: number;

    /**
     * Getter property
     */
    @ApiModelProperty({ description: 'Getter property', required: false })
    inPipeline: number;

    /**
     * Getter property
     */
    @ApiModelProperty({ description: 'Getter property', required: false })
    lastRegistration: any;

    @ApiModelProperty({ description: 'createdAt field', required: false })
    createdAt: any;

    @ApiModelProperty({ description: 'updatedAt field', required: false })
    updatedAt: any;

    @ApiModelProperty({ type: AddressDTO, description: 'address relationship' })
    address: AddressDTO;

    @ApiModelProperty({ type: CallDTO, isArray: true, description: 'calls relationship' })
    calls: CallDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

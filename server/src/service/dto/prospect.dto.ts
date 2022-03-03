/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { AddressDTO } from './address.dto';
import { CallDTO } from './call.dto';
import { ProspectStageHistoryDTO } from './prospect-stage-history.dto';
import { OnboardingStageDTO } from './onboarding-stage.dto';
import { LocationDTO } from './location.dto';
import { AgentDTO } from './agent.dto';
import { EntryChannelDTO } from './entry-channel.dto';
import { AssetTypeDTO } from './asset-type.dto';
import { Gender } from '../../domain/enumeration/gender';

/**
 * A ProspectDTO object.
 */
export class ProspectDTO extends BaseDTO {
    @IsNotEmpty()
    @ApiModelProperty({ description: 'prospectiveId field' })
    prospectiveId: string;

    @ApiModelProperty({ description: 'lastName field', required: false })
    lastName: string;

    @ApiModelProperty({ description: 'firstName field', required: false })
    firstName: string;

    @ApiModelProperty({ description: 'otherNames field', required: false })
    otherNames: string;

    @ApiModelProperty({ description: 'dateOfBirth field', required: false })
    dateOfBirth: any;

    @ApiModelProperty({ enum: Gender, description: 'gender enum field', required: false })
    gender: Gender;

    @ApiModelProperty({ description: 'email field', required: false })
    email: string;

    @ApiModelProperty({ description: 'phone field', required: false })
    phone: string;

    @ApiModelProperty({ description: 'alternatePhone field', required: false })
    alternatePhone: string;

    @ApiModelProperty({ description: 'disabilities field', required: false })
    disabilities: string;

    @ApiModelProperty({ description: 'bvn field', required: false })
    bvn: string;

    @ApiModelProperty({ description: 'bvnAddress field', required: false })
    bvnAddress: string;

    @ApiModelProperty({ description: 'isBvnVerified field', required: false })
    isBvnVerified: boolean;

    @ApiModelProperty({ description: 'bvnInformation field', required: false })
    bvnInformation: string;

    @ApiModelProperty({ description: 'driversLicenseNumber field', required: false })
    driversLicenseNumber: string;

    @ApiModelProperty({ description: 'driversLicenseExpiry field', required: false })
    driversLicenseExpiry: any;

    @ApiModelProperty({ description: 'dateAvailableForTest field', required: false })
    dateAvailableForTest: any;

    @ApiModelProperty({ description: 'photoUrl field', required: false })
    photoUrl: string;

    @ApiModelProperty({ description: 'noShowCount field', required: false })
    noShowCount: number;

    @ApiModelProperty({ description: 'activated field', required: false })
    activated: boolean;

    @ApiModelProperty({ description: 'inRecovery field', required: false })
    inRecovery: boolean;

    @ApiModelProperty({ description: 'retrain field', required: false })
    retrain: boolean;

    @ApiModelProperty({ description: 'createdAt field', required: false })
    createdAt: any;

    @ApiModelProperty({ description: 'updatedAt field', required: false })
    updatedAt: any;

    @ApiModelProperty({ type: AddressDTO, description: 'address relationship' })
    address: AddressDTO;

    @ApiModelProperty({ type: CallDTO, isArray: true, description: 'calls relationship' })
    calls: CallDTO[];

    @ApiModelProperty({
        type: ProspectStageHistoryDTO,
        isArray: true,
        description: 'prospectStageHistories relationship',
    })
    prospectStageHistories: ProspectStageHistoryDTO[];

    @ApiModelProperty({ type: OnboardingStageDTO, description: 'onboardingStage relationship' })
    onboardingStage: OnboardingStageDTO;

    @ApiModelProperty({ type: LocationDTO, description: 'location relationship' })
    location: LocationDTO;

    @ApiModelProperty({ type: AgentDTO, description: 'agent relationship' })
    agent: AgentDTO;

    @ApiModelProperty({ type: EntryChannelDTO, description: 'entryChannel relationship' })
    entryChannel: EntryChannelDTO;

    @ApiModelProperty({ type: AssetTypeDTO, isArray: true, description: 'assetTypes relationship' })
    assetTypes: AssetTypeDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

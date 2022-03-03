/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { AddressEntity } from './address.entity';
import { CallEntity } from './call.entity';
import { ProspectStageHistoryEntity } from './prospect-stage-history.entity';
import { OnboardingStageEntity } from './onboarding-stage.entity';
import { LocationEntity } from './location.entity';
import { AgentEntity } from './agent.entity';
import { EntryChannelEntity } from './entry-channel.entity';
import { AssetTypeEntity } from './asset-type.entity';
import { Gender } from './enumeration/gender';

/**
 * A ProspectEntity.
 */
@Entity('prospect')
export class ProspectEntity extends BaseEntity {
    @Column({ name: 'prospective_id' })
    prospectiveId: string;

    @Column({ name: 'last_name', nullable: true })
    lastName: string;

    @Column({ name: 'first_name', nullable: true })
    firstName: string;

    @Column({ name: 'other_names', nullable: true })
    otherNames: string;

    @Column({ type: 'datetime', name: 'date_of_birth', nullable: true })
    dateOfBirth: any;

    @Column({ type: 'simple-enum', name: 'gender', enum: Gender })
    gender: Gender;

    @Column({ name: 'email', nullable: true })
    email: string;

    @Column({ name: 'phone', nullable: true })
    phone: string;

    @Column({ name: 'alternate_phone', nullable: true })
    alternatePhone: string;

    @Column({ name: 'disabilities', nullable: true })
    disabilities: string;

    @Column({ name: 'bvn', nullable: true })
    bvn: string;

    @Column({ name: 'bvn_address', nullable: true })
    bvnAddress: string;

    @Column({ type: 'boolean', name: 'is_bvn_verified', nullable: true })
    isBvnVerified: boolean;

    @Column({ name: 'bvn_information', nullable: true })
    bvnInformation: string;

    @Column({ name: 'drivers_license_number', nullable: true })
    driversLicenseNumber: string;

    @Column({ type: 'datetime', name: 'drivers_license_expiry', nullable: true })
    driversLicenseExpiry: any;

    @Column({ type: 'datetime', name: 'date_available_for_test', nullable: true })
    dateAvailableForTest: any;

    @Column({ name: 'photo_url', nullable: true })
    photoUrl: string;

    @Column({ type: 'integer', name: 'no_show_count', nullable: true })
    noShowCount: number;

    @Column({ type: 'boolean', name: 'activated', nullable: true })
    activated: boolean;

    @Column({ type: 'boolean', name: 'in_recovery', nullable: true })
    inRecovery: boolean;

    @Column({ type: 'boolean', name: 'retrain', nullable: true })
    retrain: boolean;

    @Column({ type: 'datetime', name: 'created_at', nullable: true })
    createdAt: any;

    @Column({ type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: any;

    @OneToOne(type => AddressEntity)
    @JoinColumn()
    address: AddressEntity;

    @OneToMany(
        type => CallEntity,
        other => other.prospect,
    )
    calls: CallEntity[];

    @OneToMany(
        type => ProspectStageHistoryEntity,
        other => other.prospect,
    )
    prospectStageHistories: ProspectStageHistoryEntity[];

    @ManyToOne(type => OnboardingStageEntity)
    onboardingStage: OnboardingStageEntity;

    @ManyToOne(type => LocationEntity)
    location: LocationEntity;

    @ManyToOne(type => AgentEntity)
    agent: AgentEntity;

    @ManyToOne(type => EntryChannelEntity)
    entryChannel: EntryChannelEntity;

    @ManyToMany(type => AssetTypeEntity)
    @JoinTable({
        name: 'rel_prospect__asset_type',
        joinColumn: { name: 'prospect_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'asset_type_id', referencedColumnName: 'id' },
    })
    assetTypes: AssetTypeEntity[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { OnboardingStageEntity } from './onboarding-stage.entity';
import { ProspectEntity } from './prospect.entity';

/**
 * A ProspectStageHistoryEntity.
 */
@Entity('prospect_stage_history')
export class ProspectStageHistoryEntity extends BaseEntity {
    @Column({ name: 'name', nullable: true })
    name: string;

    @Column({ type: 'datetime', name: 'created_at', nullable: true })
    createdAt: any;

    @OneToOne(type => OnboardingStageEntity)
    @JoinColumn()
    fromStage: OnboardingStageEntity;

    @OneToOne(type => OnboardingStageEntity)
    @JoinColumn()
    toStage: OnboardingStageEntity;

    @ManyToOne(type => ProspectEntity)
    prospect: ProspectEntity;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

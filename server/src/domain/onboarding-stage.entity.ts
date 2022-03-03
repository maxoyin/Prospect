/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * OnboardingStage entity.\n@author Abiola Aluko\n@modified by Oyin
 */
@Entity('onboarding_stage')
export class OnboardingStageEntity extends BaseEntity {
    @Column({ name: 'name', nullable: true })
    name: string;

    @Column({ name: 'description', nullable: true })
    description: string;

    @Column({ type: 'integer', name: 'rank', nullable: true })
    rank: number;

    @Column({ type: 'datetime', name: 'created_at', nullable: true })
    createdAt: any;

    @Column({ type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: any;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

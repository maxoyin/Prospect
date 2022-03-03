/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * OnboardingStage entity.\n@author Abiola Aluko with modifications from Oyin
 */
@Entity('prospect_stage_event_sourcing')
export class ProspectStageEventSourcingEntity extends BaseEntity {
    @Column({ type: 'datetime', name: 'created_at', nullable: true })
    createdAt: any;

    @Column({ name: 'propsect_id', nullable: true })
    propsectId: string;

    @Column({ name: 'event', nullable: true })
    event: string;

    @Column({ name: 'payload', nullable: true })
    payload: string;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

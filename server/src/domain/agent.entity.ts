/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { AddressEntity } from './address.entity';
import { CallEntity } from './call.entity';

/**
 * A AgentEntity.
 */
@Entity('agent')
export class AgentEntity extends BaseEntity {
    @Column({ name: 'role' })
    role: string;

    @Column({ name: 'last_name', nullable: true })
    lastName: string;

    @Column({ name: 'first_name', nullable: true })
    firstName: string;

    @Column({ name: 'code', nullable: true })
    code: string;

    @Column({ name: 'status', nullable: true })
    status: string;

    @Column({ type: 'datetime', name: 'date_enrolled', nullable: true })
    dateEnrolled: any;

    /**
     * Getter property
     */
    @Column({ type: 'integer', name: 'registered_prospects', nullable: true })
    registeredProspects: number;

    /**
     * Getter property
     */
    @Column({ type: 'integer', name: 'activated_prospects', nullable: true })
    activatedProspects: number;

    /**
     * Getter property
     */
    @Column({ type: 'integer', name: 'in_pipeline', nullable: true })
    inPipeline: number;

    /**
     * Getter property
     */
    @Column({ type: 'datetime', name: 'last_registration', nullable: true })
    lastRegistration: any;

    @Column({ type: 'datetime', name: 'created_at', nullable: true })
    createdAt: any;

    @Column({ type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: any;

    @OneToOne(type => AddressEntity)
    @JoinColumn()
    address: AddressEntity;

    @OneToMany(
        type => CallEntity,
        other => other.agent,
    )
    calls: CallEntity[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { AgentEntity } from './agent.entity';
import { ProspectEntity } from './prospect.entity';

/**
 * not an ignored comment
 */
@Entity('call')
export class CallEntity extends BaseEntity {
    @Column({ name: 'comment', nullable: true })
    comment: string;

    @Column({ type: 'datetime', name: 'created_at', nullable: true })
    createdAt: any;

    @ManyToOne(type => AgentEntity)
    agent: AgentEntity;

    @ManyToOne(type => ProspectEntity)
    prospect: ProspectEntity;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

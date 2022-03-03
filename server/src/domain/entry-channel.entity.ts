/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A EntryChannelEntity.
 */
@Entity('entry_channel')
export class EntryChannelEntity extends BaseEntity {
    @Column({ name: 'name', nullable: true })
    name: string;

    @Column({ name: 'description', nullable: true })
    description: string;

    @Column({ type: 'datetime', name: 'created_at', nullable: true })
    createdAt: any;

    @Column({ type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: any;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

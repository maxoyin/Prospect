/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A AddressEntity.
 */
@Entity('address')
export class AddressEntity extends BaseEntity {
    @Column({ name: 'number', nullable: true })
    number: string;

    @Column({ name: 'street', nullable: true })
    street: string;

    @Column({ name: 'city', nullable: true })
    city: string;

    @Column({ name: 'state', nullable: true })
    state: string;

    @Column({ name: 'country_name', nullable: true })
    countryName: string;

    @Column({ name: 'country_code', nullable: true })
    countryCode: string;

    @Column({ type: 'datetime', name: 'created_at', nullable: true })
    createdAt: any;

    @Column({ type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: any;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

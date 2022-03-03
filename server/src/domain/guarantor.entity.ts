/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { AddressEntity } from './address.entity';
import { Gender } from './enumeration/gender';

/**
 * A GuarantorEntity.
 */
@Entity('guarantor')
export class GuarantorEntity extends BaseEntity {
    @Column({ name: 'last_name', nullable: true })
    lastName: string;

    @Column({ name: 'first_name', nullable: true })
    firstName: string;

    @Column({ name: 'other_names', nullable: true })
    otherNames: string;

    @Column({ type: 'simple-enum', name: 'gender', enum: Gender })
    gender: Gender;

    @Column({ name: 'email', nullable: true })
    email: string;

    @Column({ name: 'phone', nullable: true })
    phone: string;

    @Column({ name: 'alternate_phone', nullable: true })
    alternatePhone: string;

    @Column({ name: 'bvn', nullable: true })
    bvn: string;

    @Column({ type: 'datetime', name: 'created_at', nullable: true })
    createdAt: any;

    @Column({ type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: any;

    @OneToOne(type => AddressEntity)
    @JoinColumn()
    adress: AddressEntity;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { AddressDTO } from '../service/dto/address.dto';
import { AddressMapper } from '../service/mapper/address.mapper';
import { AddressRepository } from '../repository/address.repository';

const relationshipNames = [];

@Injectable()
export class AddressService {
    logger = new Logger('AddressService');

    constructor(@InjectRepository(AddressRepository) private addressEntityRepository: AddressRepository) {}

    async findById(id: number): Promise<AddressDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.addressEntityRepository.findOne(id, options);
        return AddressMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<AddressDTO>): Promise<AddressDTO | undefined> {
        const result = await this.addressEntityRepository.findOne(options);
        return AddressMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<AddressDTO>): Promise<[AddressDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.addressEntityRepository.findAndCount(options);
        const addressEntityDTO: AddressDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(addressEntity => addressEntityDTO.push(AddressMapper.fromEntityToDTO(addressEntity)));
            resultList[0] = addressEntityDTO;
        }
        return resultList;
    }

    async save(addressEntityDTO: AddressDTO, creator?: string): Promise<AddressDTO | undefined> {
        const entity = AddressMapper.fromDTOtoEntity(addressEntityDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.addressEntityRepository.save(entity);
        return AddressMapper.fromEntityToDTO(result);
    }

    async update(addressEntityDTO: AddressDTO, updater?: string): Promise<AddressDTO | undefined> {
        const entity = AddressMapper.fromDTOtoEntity(addressEntityDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.addressEntityRepository.save(entity);
        return AddressMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.addressEntityRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}

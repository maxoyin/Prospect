import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { AssetTypeDTO } from '../service/dto/asset-type.dto';
import { AssetTypeMapper } from '../service/mapper/asset-type.mapper';
import { AssetTypeRepository } from '../repository/asset-type.repository';

const relationshipNames = [];

@Injectable()
export class AssetTypeService {
    logger = new Logger('AssetTypeService');

    constructor(@InjectRepository(AssetTypeRepository) private assetTypeEntityRepository: AssetTypeRepository) {}

    async findById(id: number): Promise<AssetTypeDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.assetTypeEntityRepository.findOne(id, options);
        return AssetTypeMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<AssetTypeDTO>): Promise<AssetTypeDTO | undefined> {
        const result = await this.assetTypeEntityRepository.findOne(options);
        return AssetTypeMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<AssetTypeDTO>): Promise<[AssetTypeDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.assetTypeEntityRepository.findAndCount(options);
        const assetTypeEntityDTO: AssetTypeDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(assetTypeEntity =>
                assetTypeEntityDTO.push(AssetTypeMapper.fromEntityToDTO(assetTypeEntity)),
            );
            resultList[0] = assetTypeEntityDTO;
        }
        return resultList;
    }

    async save(assetTypeEntityDTO: AssetTypeDTO, creator?: string): Promise<AssetTypeDTO | undefined> {
        const entity = AssetTypeMapper.fromDTOtoEntity(assetTypeEntityDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.assetTypeEntityRepository.save(entity);
        return AssetTypeMapper.fromEntityToDTO(result);
    }

    async update(assetTypeEntityDTO: AssetTypeDTO, updater?: string): Promise<AssetTypeDTO | undefined> {
        const entity = AssetTypeMapper.fromDTOtoEntity(assetTypeEntityDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.assetTypeEntityRepository.save(entity);
        return AssetTypeMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.assetTypeEntityRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}

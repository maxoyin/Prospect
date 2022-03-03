import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { EntryChannelDTO } from '../service/dto/entry-channel.dto';
import { EntryChannelMapper } from '../service/mapper/entry-channel.mapper';
import { EntryChannelRepository } from '../repository/entry-channel.repository';

const relationshipNames = [];

@Injectable()
export class EntryChannelService {
    logger = new Logger('EntryChannelService');

    constructor(
        @InjectRepository(EntryChannelRepository) private entryChannelEntityRepository: EntryChannelRepository,
    ) {}

    async findById(id: number): Promise<EntryChannelDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.entryChannelEntityRepository.findOne(id, options);
        return EntryChannelMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<EntryChannelDTO>): Promise<EntryChannelDTO | undefined> {
        const result = await this.entryChannelEntityRepository.findOne(options);
        return EntryChannelMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<EntryChannelDTO>): Promise<[EntryChannelDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.entryChannelEntityRepository.findAndCount(options);
        const entryChannelEntityDTO: EntryChannelDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(entryChannelEntity =>
                entryChannelEntityDTO.push(EntryChannelMapper.fromEntityToDTO(entryChannelEntity)),
            );
            resultList[0] = entryChannelEntityDTO;
        }
        return resultList;
    }

    async save(entryChannelEntityDTO: EntryChannelDTO, creator?: string): Promise<EntryChannelDTO | undefined> {
        const entity = EntryChannelMapper.fromDTOtoEntity(entryChannelEntityDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.entryChannelEntityRepository.save(entity);
        return EntryChannelMapper.fromEntityToDTO(result);
    }

    async update(entryChannelEntityDTO: EntryChannelDTO, updater?: string): Promise<EntryChannelDTO | undefined> {
        const entity = EntryChannelMapper.fromDTOtoEntity(entryChannelEntityDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.entryChannelEntityRepository.save(entity);
        return EntryChannelMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.entryChannelEntityRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}

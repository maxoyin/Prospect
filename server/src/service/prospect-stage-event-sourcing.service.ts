import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { ProspectStageEventSourcingDTO } from '../service/dto/prospect-stage-event-sourcing.dto';
import { ProspectStageEventSourcingMapper } from '../service/mapper/prospect-stage-event-sourcing.mapper';
import { ProspectStageEventSourcingRepository } from '../repository/prospect-stage-event-sourcing.repository';

const relationshipNames = [];

@Injectable()
export class ProspectStageEventSourcingService {
    logger = new Logger('ProspectStageEventSourcingService');

    constructor(
        @InjectRepository(ProspectStageEventSourcingRepository)
        private prospectStageEventSourcingEntityRepository: ProspectStageEventSourcingRepository,
    ) {}

    async findById(id: number): Promise<ProspectStageEventSourcingDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.prospectStageEventSourcingEntityRepository.findOne(id, options);
        return ProspectStageEventSourcingMapper.fromEntityToDTO(result);
    }

    async findByFields(
        options: FindOneOptions<ProspectStageEventSourcingDTO>,
    ): Promise<ProspectStageEventSourcingDTO | undefined> {
        const result = await this.prospectStageEventSourcingEntityRepository.findOne(options);
        return ProspectStageEventSourcingMapper.fromEntityToDTO(result);
    }

    async findAndCount(
        options: FindManyOptions<ProspectStageEventSourcingDTO>,
    ): Promise<[ProspectStageEventSourcingDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.prospectStageEventSourcingEntityRepository.findAndCount(options);
        const prospectStageEventSourcingEntityDTO: ProspectStageEventSourcingDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(prospectStageEventSourcingEntity =>
                prospectStageEventSourcingEntityDTO.push(
                    ProspectStageEventSourcingMapper.fromEntityToDTO(prospectStageEventSourcingEntity),
                ),
            );
            resultList[0] = prospectStageEventSourcingEntityDTO;
        }
        return resultList;
    }

    async save(
        prospectStageEventSourcingEntityDTO: ProspectStageEventSourcingDTO,
        creator?: string,
    ): Promise<ProspectStageEventSourcingDTO | undefined> {
        const entity = ProspectStageEventSourcingMapper.fromDTOtoEntity(prospectStageEventSourcingEntityDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.prospectStageEventSourcingEntityRepository.save(entity);
        return ProspectStageEventSourcingMapper.fromEntityToDTO(result);
    }

    async update(
        prospectStageEventSourcingEntityDTO: ProspectStageEventSourcingDTO,
        updater?: string,
    ): Promise<ProspectStageEventSourcingDTO | undefined> {
        const entity = ProspectStageEventSourcingMapper.fromDTOtoEntity(prospectStageEventSourcingEntityDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.prospectStageEventSourcingEntityRepository.save(entity);
        return ProspectStageEventSourcingMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.prospectStageEventSourcingEntityRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}

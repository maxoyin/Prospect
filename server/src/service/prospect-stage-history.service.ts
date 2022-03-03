import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { ProspectStageHistoryDTO } from '../service/dto/prospect-stage-history.dto';
import { ProspectStageHistoryMapper } from '../service/mapper/prospect-stage-history.mapper';
import { ProspectStageHistoryRepository } from '../repository/prospect-stage-history.repository';

const relationshipNames = [];
relationshipNames.push('prospect');

@Injectable()
export class ProspectStageHistoryService {
    logger = new Logger('ProspectStageHistoryService');

    constructor(
        @InjectRepository(ProspectStageHistoryRepository)
        private prospectStageHistoryEntityRepository: ProspectStageHistoryRepository,
    ) {}

    async findById(id: number): Promise<ProspectStageHistoryDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.prospectStageHistoryEntityRepository.findOne(id, options);
        return ProspectStageHistoryMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<ProspectStageHistoryDTO>): Promise<ProspectStageHistoryDTO | undefined> {
        const result = await this.prospectStageHistoryEntityRepository.findOne(options);
        return ProspectStageHistoryMapper.fromEntityToDTO(result);
    }

    async findAndCount(
        options: FindManyOptions<ProspectStageHistoryDTO>,
    ): Promise<[ProspectStageHistoryDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.prospectStageHistoryEntityRepository.findAndCount(options);
        const prospectStageHistoryEntityDTO: ProspectStageHistoryDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(prospectStageHistoryEntity =>
                prospectStageHistoryEntityDTO.push(
                    ProspectStageHistoryMapper.fromEntityToDTO(prospectStageHistoryEntity),
                ),
            );
            resultList[0] = prospectStageHistoryEntityDTO;
        }
        return resultList;
    }

    async save(
        prospectStageHistoryEntityDTO: ProspectStageHistoryDTO,
        creator?: string,
    ): Promise<ProspectStageHistoryDTO | undefined> {
        const entity = ProspectStageHistoryMapper.fromDTOtoEntity(prospectStageHistoryEntityDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.prospectStageHistoryEntityRepository.save(entity);
        return ProspectStageHistoryMapper.fromEntityToDTO(result);
    }

    async update(
        prospectStageHistoryEntityDTO: ProspectStageHistoryDTO,
        updater?: string,
    ): Promise<ProspectStageHistoryDTO | undefined> {
        const entity = ProspectStageHistoryMapper.fromDTOtoEntity(prospectStageHistoryEntityDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.prospectStageHistoryEntityRepository.save(entity);
        return ProspectStageHistoryMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.prospectStageHistoryEntityRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}

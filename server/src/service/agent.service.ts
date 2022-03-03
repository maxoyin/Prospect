import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { AgentDTO } from '../service/dto/agent.dto';
import { AgentMapper } from '../service/mapper/agent.mapper';
import { AgentRepository } from '../repository/agent.repository';

const relationshipNames = [];

@Injectable()
export class AgentService {
    logger = new Logger('AgentService');

    constructor(@InjectRepository(AgentRepository) private agentEntityRepository: AgentRepository) {}

    async findById(id: number): Promise<AgentDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.agentEntityRepository.findOne(id, options);
        return AgentMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<AgentDTO>): Promise<AgentDTO | undefined> {
        const result = await this.agentEntityRepository.findOne(options);
        return AgentMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<AgentDTO>): Promise<[AgentDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.agentEntityRepository.findAndCount(options);
        const agentEntityDTO: AgentDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(agentEntity => agentEntityDTO.push(AgentMapper.fromEntityToDTO(agentEntity)));
            resultList[0] = agentEntityDTO;
        }
        return resultList;
    }

    async save(agentEntityDTO: AgentDTO, creator?: string): Promise<AgentDTO | undefined> {
        const entity = AgentMapper.fromDTOtoEntity(agentEntityDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.agentEntityRepository.save(entity);
        return AgentMapper.fromEntityToDTO(result);
    }

    async update(agentEntityDTO: AgentDTO, updater?: string): Promise<AgentDTO | undefined> {
        const entity = AgentMapper.fromDTOtoEntity(agentEntityDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.agentEntityRepository.save(entity);
        return AgentMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.agentEntityRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}

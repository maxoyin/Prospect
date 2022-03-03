import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { CallDTO } from '../service/dto/call.dto';
import { CallMapper } from '../service/mapper/call.mapper';
import { CallRepository } from '../repository/call.repository';

const relationshipNames = [];
relationshipNames.push('agent');
relationshipNames.push('prospect');

@Injectable()
export class CallService {
    logger = new Logger('CallService');

    constructor(@InjectRepository(CallRepository) private callEntityRepository: CallRepository) {}

    async findById(id: number): Promise<CallDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.callEntityRepository.findOne(id, options);
        return CallMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<CallDTO>): Promise<CallDTO | undefined> {
        const result = await this.callEntityRepository.findOne(options);
        return CallMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<CallDTO>): Promise<[CallDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.callEntityRepository.findAndCount(options);
        const callEntityDTO: CallDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(callEntity => callEntityDTO.push(CallMapper.fromEntityToDTO(callEntity)));
            resultList[0] = callEntityDTO;
        }
        return resultList;
    }

    async save(callEntityDTO: CallDTO, creator?: string): Promise<CallDTO | undefined> {
        const entity = CallMapper.fromDTOtoEntity(callEntityDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.callEntityRepository.save(entity);
        return CallMapper.fromEntityToDTO(result);
    }

    async update(callEntityDTO: CallDTO, updater?: string): Promise<CallDTO | undefined> {
        const entity = CallMapper.fromDTOtoEntity(callEntityDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.callEntityRepository.save(entity);
        return CallMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.callEntityRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}

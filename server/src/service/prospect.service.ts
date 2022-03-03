import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { ProspectDTO } from '../service/dto/prospect.dto';
import { ProspectMapper } from '../service/mapper/prospect.mapper';
import { ProspectRepository } from '../repository/prospect.repository';

const relationshipNames = [];
relationshipNames.push('onboardingStage');
relationshipNames.push('location');
relationshipNames.push('agent');
relationshipNames.push('entryChannel');
relationshipNames.push('assetTypes');

@Injectable()
export class ProspectService {
    logger = new Logger('ProspectService');

    constructor(@InjectRepository(ProspectRepository) private prospectEntityRepository: ProspectRepository) {}

    async findById(id: number): Promise<ProspectDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.prospectEntityRepository.findOne(id, options);
        return ProspectMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<ProspectDTO>): Promise<ProspectDTO | undefined> {
        const result = await this.prospectEntityRepository.findOne(options);
        return ProspectMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<ProspectDTO>): Promise<[ProspectDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.prospectEntityRepository.findAndCount(options);
        const prospectEntityDTO: ProspectDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(prospectEntity =>
                prospectEntityDTO.push(ProspectMapper.fromEntityToDTO(prospectEntity)),
            );
            resultList[0] = prospectEntityDTO;
        }
        return resultList;
    }

    async save(prospectEntityDTO: ProspectDTO, creator?: string): Promise<ProspectDTO | undefined> {
        const entity = ProspectMapper.fromDTOtoEntity(prospectEntityDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.prospectEntityRepository.save(entity);
        return ProspectMapper.fromEntityToDTO(result);
    }

    async update(prospectEntityDTO: ProspectDTO, updater?: string): Promise<ProspectDTO | undefined> {
        const entity = ProspectMapper.fromDTOtoEntity(prospectEntityDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.prospectEntityRepository.save(entity);
        return ProspectMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.prospectEntityRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}

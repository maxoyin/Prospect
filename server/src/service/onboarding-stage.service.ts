import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { OnboardingStageDTO } from '../service/dto/onboarding-stage.dto';
import { OnboardingStageMapper } from '../service/mapper/onboarding-stage.mapper';
import { OnboardingStageRepository } from '../repository/onboarding-stage.repository';

const relationshipNames = [];

@Injectable()
export class OnboardingStageService {
    logger = new Logger('OnboardingStageService');

    constructor(
        @InjectRepository(OnboardingStageRepository) private onboardingStageEntityRepository: OnboardingStageRepository,
    ) {}

    async findById(id: number): Promise<OnboardingStageDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.onboardingStageEntityRepository.findOne(id, options);
        return OnboardingStageMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<OnboardingStageDTO>): Promise<OnboardingStageDTO | undefined> {
        const result = await this.onboardingStageEntityRepository.findOne(options);
        return OnboardingStageMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<OnboardingStageDTO>): Promise<[OnboardingStageDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.onboardingStageEntityRepository.findAndCount(options);
        const onboardingStageEntityDTO: OnboardingStageDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(onboardingStageEntity =>
                onboardingStageEntityDTO.push(OnboardingStageMapper.fromEntityToDTO(onboardingStageEntity)),
            );
            resultList[0] = onboardingStageEntityDTO;
        }
        return resultList;
    }

    async save(
        onboardingStageEntityDTO: OnboardingStageDTO,
        creator?: string,
    ): Promise<OnboardingStageDTO | undefined> {
        const entity = OnboardingStageMapper.fromDTOtoEntity(onboardingStageEntityDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.onboardingStageEntityRepository.save(entity);
        return OnboardingStageMapper.fromEntityToDTO(result);
    }

    async update(
        onboardingStageEntityDTO: OnboardingStageDTO,
        updater?: string,
    ): Promise<OnboardingStageDTO | undefined> {
        const entity = OnboardingStageMapper.fromDTOtoEntity(onboardingStageEntityDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.onboardingStageEntityRepository.save(entity);
        return OnboardingStageMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.onboardingStageEntityRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}

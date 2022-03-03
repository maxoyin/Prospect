import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Post as PostMethod,
    Put,
    UseGuards,
    Req,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { OnboardingStageDTO } from '../../service/dto/onboarding-stage.dto';
import { OnboardingStageService } from '../../service/onboarding-stage.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/onboarding-stages')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('onboarding-stages')
export class OnboardingStageController {
    logger = new Logger('OnboardingStageController');

    constructor(private readonly onboardingStageEntityService: OnboardingStageService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: OnboardingStageDTO,
    })
    async getAll(@Req() req: Request): Promise<OnboardingStageDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.onboardingStageEntityService.findAndCount({
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });
        HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
        return results;
    }

    @Get('/:id')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: OnboardingStageDTO,
    })
    async getOne(@Param('id') id: number): Promise<OnboardingStageDTO> {
        return await this.onboardingStageEntityService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create onboardingStageEntity' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: OnboardingStageDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() onboardingStageEntityDTO: OnboardingStageDTO): Promise<OnboardingStageDTO> {
        const created = await this.onboardingStageEntityService.save(onboardingStageEntityDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'OnboardingStage', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update onboardingStageEntity' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: OnboardingStageDTO,
    })
    async put(@Req() req: Request, @Body() onboardingStageEntityDTO: OnboardingStageDTO): Promise<OnboardingStageDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'OnboardingStage', onboardingStageEntityDTO.id);
        return await this.onboardingStageEntityService.update(onboardingStageEntityDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update onboardingStageEntity with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: OnboardingStageDTO,
    })
    async putId(
        @Req() req: Request,
        @Body() onboardingStageEntityDTO: OnboardingStageDTO,
    ): Promise<OnboardingStageDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'OnboardingStage', onboardingStageEntityDTO.id);
        return await this.onboardingStageEntityService.update(onboardingStageEntityDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete onboardingStageEntity' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'OnboardingStage', id);
        return await this.onboardingStageEntityService.deleteById(id);
    }
}

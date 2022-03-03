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
import { ProspectStageEventSourcingDTO } from '../../service/dto/prospect-stage-event-sourcing.dto';
import { ProspectStageEventSourcingService } from '../../service/prospect-stage-event-sourcing.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/prospect-stage-event-sourcings')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('prospect-stage-event-sourcings')
export class ProspectStageEventSourcingController {
    logger = new Logger('ProspectStageEventSourcingController');

    constructor(private readonly prospectStageEventSourcingEntityService: ProspectStageEventSourcingService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: ProspectStageEventSourcingDTO,
    })
    async getAll(@Req() req: Request): Promise<ProspectStageEventSourcingDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.prospectStageEventSourcingEntityService.findAndCount({
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
        type: ProspectStageEventSourcingDTO,
    })
    async getOne(@Param('id') id: number): Promise<ProspectStageEventSourcingDTO> {
        return await this.prospectStageEventSourcingEntityService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create prospectStageEventSourcingEntity' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: ProspectStageEventSourcingDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(
        @Req() req: Request,
        @Body() prospectStageEventSourcingEntityDTO: ProspectStageEventSourcingDTO,
    ): Promise<ProspectStageEventSourcingDTO> {
        const created = await this.prospectStageEventSourcingEntityService.save(
            prospectStageEventSourcingEntityDTO,
            req.user?.login,
        );
        HeaderUtil.addEntityCreatedHeaders(req.res, 'ProspectStageEventSourcing', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update prospectStageEventSourcingEntity' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ProspectStageEventSourcingDTO,
    })
    async put(
        @Req() req: Request,
        @Body() prospectStageEventSourcingEntityDTO: ProspectStageEventSourcingDTO,
    ): Promise<ProspectStageEventSourcingDTO> {
        HeaderUtil.addEntityCreatedHeaders(
            req.res,
            'ProspectStageEventSourcing',
            prospectStageEventSourcingEntityDTO.id,
        );
        return await this.prospectStageEventSourcingEntityService.update(
            prospectStageEventSourcingEntityDTO,
            req.user?.login,
        );
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update prospectStageEventSourcingEntity with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ProspectStageEventSourcingDTO,
    })
    async putId(
        @Req() req: Request,
        @Body() prospectStageEventSourcingEntityDTO: ProspectStageEventSourcingDTO,
    ): Promise<ProspectStageEventSourcingDTO> {
        HeaderUtil.addEntityCreatedHeaders(
            req.res,
            'ProspectStageEventSourcing',
            prospectStageEventSourcingEntityDTO.id,
        );
        return await this.prospectStageEventSourcingEntityService.update(
            prospectStageEventSourcingEntityDTO,
            req.user?.login,
        );
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete prospectStageEventSourcingEntity' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'ProspectStageEventSourcing', id);
        return await this.prospectStageEventSourcingEntityService.deleteById(id);
    }
}
